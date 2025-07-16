import express from "express";
import cors from "cors";
const app = express();
import notFound from "./src/middlewares/not-found.js";
import mantenimiento, {
    activarMantenimiento,
    desactivarMantenimiento,
    estado
}from "./src/middlewares/mantenimiento.js";

const products= [
    { id: 1, nombre: "Resistencia 220Ω", precio: 5, categoria: ["resistencia", "carbono"] },
    { id: 2, nombre: "Condensador cerámico 100nF", precio: 8, categoria: ["capacitor", "cerámico"] },
    { id: 3, nombre: "Inductor 10µH", precio: 12, categoria: ["inductor", "bobina"] },
    { id: 4, nombre: "Diodo 1N4007", precio: 3, categoria: ["diodo", "rectificador"] },
    { id: 5, nombre: "Transistor BC547", precio: 6, categoria: ["transistor", "NPN"] },
    { id: 6, nombre: "Potenciómetro 10kΩ", precio: 10, categoria: ["resistencia", "variable"] },
    { id: 7, nombre: "Condensador electrolítico 470µF", precio: 15, categoria: ["capacitor", "electrolítico"] },
    { id: 8, nombre: "LED rojo 5mm", precio: 4, categoria: ["diodo", "emisor de luz"] },
    { id: 9, nombre: "Cristal de cuarzo 16MHz", precio: 9, categoria: ["oscilador", "cuarzo"] },
    { id: 10, nombre: "Interruptor táctil", precio: 7, categoria: ["interruptor", "momentáneo"] }
  ];

// Middleware de mantenimiento
app.use(mantenimiento)

app.get("/",(req,res)=>{
    res.json({'message':"Bienvenido a nuestra API REST"});
});

app.get('/products',(req,res) => {
    const {categoria}=req.query
    if (categoria){
        const productFiltradros =products.filter(item => item.categoria.includes(categoria));
       return res.json(productFiltradros);
        
    }
     res.json(products);
  
})

// app.get("/products/search",(req,res)=>{
//     const {nombre}=req.query;
//     if(!nombre){
//         return res.status(400).json({error:"el nombre es requerido"});
//     }
//     const productoNombre=products.filter(item=>
//             item.nombre.toLowerCase().includes(nombre.toLowerCase()));
    
//     if (productoNombre.length===0){
//         return res.status(404).json({error:"no existe el producto"});
//     } 
//      return res.json(productoNombre);
       
    

// })
app.get("/product/search", (req, res) => {
    const { nombre, categoria, precioMin, precioMax, orden } = req.query;
  
    let resultado = products;
  
    if (nombre) {
      resultado = resultado.filter(item =>
        item.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    }
  
    if (categoria) {
      resultado = resultado.filter(item =>
        item.categoria.some(cat => cat.toLowerCase().includes(categoria.toLowerCase()))
      );
    }
  
    if (precioMin) {
      const min = parseFloat(precioMin);
      if (!isNaN(min)) {
        resultado = resultado.filter(item => item.precio >= min);
      }
    }
  
    if (precioMax) {
      const max = parseFloat(precioMax);
      if (!isNaN(max)) {
        resultado = resultado.filter(item => item.precio <= max);
      }
    }
  
    // 🧮 Ordenar por precio
    if (orden === "asc") {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "desc") {
      resultado.sort((a, b) => b.precio - a.precio);
    }
  
    if (resultado.length === 0) {
      return res.status(404).json({ error: "No se encontraron productos con los filtros aplicados" });
    }
  
    return res.json(resultado);
  });


app.get('/products/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const product = products.find((item)=>item.id==id);

    if(!product){
        return res.status(404).json({error:"El producto no existe"});
    }

    return res.json(product);
})



app.get("/estado", (req, res) => {
  res.json({ mantenimiento: estado.activo });
});


app.post("/activar-mantenimiento", (req, res) => {
    activarMantenimiento();
    res.json({ message: "Modo mantenimiento activado" });
  });
  
  app.post("/desactivar-mantenimiento", (req, res) => {
    desactivarMantenimiento();
    res.json({ message: "Modo mantenimiento desactivado" });
  });


app.use(notFound);



const PORT =3000;


app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));
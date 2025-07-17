import * as Model from "../models/Product.js";



export const getAllProducts =async (req,res) => {
    const {categoria}=req.query
    const products=await Model.getAllProducts();

    if (categoria){
        const productFiltradros =products.filter(item => item.categoria.includes(categoria));
       return res.json(productFiltradros);
    }
     return res.json(products);
  
}

export const searchProducts =async (req, res) => {
  const { nombre, categoria, precioMin, precioMax, orden, solo } = req.query;
    const products=await Model.getAllProducts();
  let resultado = products;

  // 🔎 Filtrar por nombre
  if (nombre) {
    resultado = resultado.filter(item =>
      item.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  // 🔎 Filtrar por categoría
  if (categoria) {
    resultado = resultado.filter(item =>
      item.categoria.some(cat =>
        cat.toLowerCase().includes(categoria.toLowerCase())
      )
    );
  }

  // 💰 Filtrar por precio mínimo
  if (precioMin) {
    const min = parseFloat(precioMin);
    if (!isNaN(min)) {
      resultado = resultado.filter(item => item.precio >= min);
    }
  }

  // 💰 Filtrar por precio máximo
  if (precioMax) {
    const max = parseFloat(precioMax);
    if (!isNaN(max)) {
      resultado = resultado.filter(item => item.precio <= max);
    }
  }

  // 🧮 Ordenar si se solicita
  if (orden === "asc") {
    resultado.sort((a, b) => a.precio - b.precio);
  } else if (orden === "desc") {
    resultado.sort((a, b) => b.precio - a.precio);
  }

  // 🎯 Mostrar solo el producto más barato o más caro
  if (solo === "menor") {
    const menor = resultado.reduce((acc, item) =>
      item.precio < acc.precio ? item : acc, resultado[0]);
    return res.json(menor);
  } else if (solo === "mayor") {
    const mayor = resultado.reduce((acc, item) =>
      item.precio > acc.precio ? item : acc, resultado[0]);
    return res.json(mayor);
  }


  

  // ⚠️ Manejo si no se encuentra nada
  if (resultado.length === 0) {
    return res.status(404).json({ error: "No se encontraron productos con los filtros aplicados" });
  }

  // 📦 Resultado final
  return res.json(resultado);
}

export const productsById=(req,res) => {
    const id = parseInt(req.params.id);
    const product = Model.productsById(id);

    if(!product){
        return res.status(404).json({error:"El producto no existe"});
    }

    return res.json(product);
}
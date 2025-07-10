import express from "express";
const app = express();
import notFound from "./src/middlewares/not-found.js";






app.use((req,res,next)=>{
   //res.json({'message':"Hola API en mantenimiento"});
   console.log(req.method);
   next();
});
app.use(notFound);

app.get("/",(req,res)=>{
    res.json({'message':"Bienvenido a nuestra API REST"});
});



const PORT =3000;


app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));
import 'dotenv/config';
import express from "express";
import cors from "cors";
import notFound from "./src/middlewares/not-found.js";
import productsRouter from './src/routes/products.routes.js';
import mantenimiento from "./src/middlewares/mantenimiento.js";
import mantenimientoRoutes from './src/routes/mantenimiento.routes.js'


const app = express();
app.use(express.json());
app.use(cors());

// Middleware de mantenimiento

app.use("/mantenimiento", mantenimientoRoutes);
app.use(mantenimiento);


app.get("/",(req,res)=>{
    res.json({'message':"Bienvenido a nuestra API REST"});
});

app.use("/api",productsRouter);

app.use(notFound);



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));
import { Router } from "express";


import { activar, desactivar, getEstado } from "../controllers/mantenimiento.controllers.js";

const router = Router();

// NO usamos el middleware acá, para no bloquear estas rutas
// router.use(mantenimiento); 

router.get("/estado",getEstado);

router.post("/activar-mantenimiento", activar);

router.post("/desactivar-mantenimiento",desactivar );

export default router;


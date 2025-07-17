// Importamos el middleware principal como default
import mantenimiento from "../middlewares/mantenimiento.js";

// Importamos las funciones auxiliares y estado
import {
  activarMantenimiento,
  desactivarMantenimiento,
  estado
} from "../middlewares/mantenimiento.js";


export const getEstado = (req, res) => {
  res.json({ mantenimiento: estado.activo });
}

export const activar = (req, res) => {
  activarMantenimiento();
  res.json({ message: "Modo mantenimiento activado" });
};

export const desactivar =(req, res) => {
  desactivarMantenimiento();
  res.json({ message: "Modo mantenimiento desactivado" });
};

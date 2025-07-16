// mantenimiento.js
const estado = { activo: false };

export function activarMantenimiento() {
  estado.activo = true;
}

export function desactivarMantenimiento() {
  estado.activo = false;
}

export { estado }; // 👈 exportación para consulta

export default function (req, res, next) {
  if (estado.activo) {
    return res.status(503).json({ error: "La API está en mantenimiento" });
  }
  next();
}

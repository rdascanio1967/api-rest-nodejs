// Estado global del modo mantenimiento
const estado = { activo: false };

// Funciones para activar y desactivar mantenimiento
export function activarMantenimiento() {
  estado.activo = true;
}

export function desactivarMantenimiento() {
  estado.activo = false;
}

// Exportamos el estado para consulta
export { estado };

// Middleware principal
export default function (req, res, next) {
  // Permitimos las rutas de control sin bloquear (opcional)
  if (req.path.startsWith("/mantenimiento")) {
    return next();
  }

  // Si está activo, bloqueamos todo lo demás
  if (estado.activo) {
    return res.status(503).json({ error: "La API está en mantenimiento" });
  }

  next();
}

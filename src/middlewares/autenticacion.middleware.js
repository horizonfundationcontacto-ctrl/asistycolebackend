const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del "Bearer TOKEN"

  if (!token) {
    return res
      .status(403)
      .json({ error: "No se proporcionó un token de acceso" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Guardamos la info del usuario (id, rol, colegio_id) en la petición
    next(); // Continuamos al controlador
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = { verificarToken };

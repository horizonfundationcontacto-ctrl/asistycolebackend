const express = require("express");
const router = express.Router();
// Importar las rutas individuales
const rolesRoutes = require("./routes/roles");
const colegiosRoutes = require("./routes/colegios");
const autenticacionRoutes = require("./routes/autenticacion");
const gradosRoutes = require("./routes/grados");
const seccionesRoutes = require("./routes/secciones");
const alumnosRoutes = require("./routes/alumnos");
const config_horariosgRoutes = require("./routes/config_horarios");
const asistenciasRoutes = require("./routes/asistencias");
const categoria_gradosRoutes = require("./routes/categoria_grados");
const categoria_seccionesRoutes = require("./routes/categoria_secciones");
const usuariosRoutes = require("./routes/usuarios");

router.get("/", (req, res) => {
  res.send("Servidor corriendo en AsistyCole API 🚀");
});
router.use("/roles", rolesRoutes);
router.use("/colegios", colegiosRoutes);
router.use("/autenticacion", autenticacionRoutes);
router.use("/grados", gradosRoutes);
router.use("/secciones", seccionesRoutes);
router.use("/alumnos", alumnosRoutes);
router.use("/confighorarios", config_horariosgRoutes);
router.use("/asistencias", asistenciasRoutes);
router.use("/categoriagrados", categoria_gradosRoutes);
router.use("/catsecciones", categoria_seccionesRoutes);
router.use("/usuarios", usuariosRoutes);

// Exportar el router centralizado
module.exports = router;

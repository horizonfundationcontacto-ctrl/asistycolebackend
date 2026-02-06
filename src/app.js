const express = require("express");
const router = express.Router();

// Importar las rutas individuales
const rolesRoutes = require("./routes/roles");
const colegiosRoutes = require("./routes/colegios");

// Definir los prefijos para cada grupo de rutas
router.use("/roles", rolesRoutes);
router.use("/colegios", colegiosRoutes);

// Exportar el router centralizado
module.exports = router;

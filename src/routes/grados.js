const express = require("express");
const router = express.Router();
const gradosController = require("../controllers/grados.controller");
const { verificarToken } = require("../middlewares/autenticacion.middleware");

// Todas las rutas de grados ahora requieren estar logueado
router.get("/", verificarToken, gradosController.getGrados);
router.post("/", verificarToken, gradosController.createGrado);

module.exports = router;

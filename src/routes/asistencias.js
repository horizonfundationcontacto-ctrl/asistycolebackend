const express = require("express");
const router = express.Router();
const asistenciaController = require("../controllers/asistencias.controller");
const { verificarToken } = require("../middlewares/autenticacion.middleware");

// Endpoint para el escaneo de QRs
router.post("/marcar", verificarToken, asistenciaController.marcarAsistencia);

module.exports = router;

const express = require("express");
const router = express.Router();
const seccionesController = require("../controllers/secciones.controller");
const { verificarToken } = require("../middlewares/autenticacion.middleware");

router.post("/", verificarToken, seccionesController.createSeccion);
// En secciones.routes.js
router.get("/por-grado/:gradoId", seccionesController.getSeccionesPorGrado);

module.exports = router;

const express = require("express");
const router = express.Router();
const colegiosController = require("../controllers/colegios.controller");

// Ruta para obtener todos los roles
router.get("/", colegiosController.getColegios);
router.post("/", colegiosController.createColegio);
module.exports = router;

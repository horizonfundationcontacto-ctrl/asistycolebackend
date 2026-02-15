const express = require("express");
const router = express.Router();
const autenticacionController = require("../controllers/autenticacion.controller");

// Ruta para obtener todos los roles
router.post("/login", autenticacionController.login);
router.post("/registrar", autenticacionController.register);
module.exports = router;

const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.controller");

// Ruta para obtener todos los roles
router.get("/", rolesController.getRoles);

module.exports = router;

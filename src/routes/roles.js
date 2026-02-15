const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.controller");

// No le ponemos middleware de auth aún para que puedas registrar los primeros
router.get("/", rolesController.getRoles);
router.post("/", rolesController.createRol);

module.exports = router;

const express = require("express");
const router = express.Router();
const categoria_gradosController = require("../controllers/categoria_grados.controller");

router.post("/", categoria_gradosController.createCatGrado);
router.get("/", categoria_gradosController.getCatGrados);

module.exports = router;

const express = require("express");
const router = express.Router();
const cat_seccionesController = require("../controllers/categoria_secciones.controller");

router.post("/", cat_seccionesController.createCatSeccion);
router.get("/", cat_seccionesController.getCatSecciones);
router.delete("/:id", cat_seccionesController.deleteCatSeccion);

module.exports = router;

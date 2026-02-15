const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnos.controller");
const { verificarToken } = require("../middlewares/autenticacion.middleware");

router.post("/", verificarToken, alumnosController.createAlumno);
router.get(
  "/seccion/:seccionId",
  verificarToken,
  alumnosController.getAlumnosPorSeccion
);

module.exports = router;

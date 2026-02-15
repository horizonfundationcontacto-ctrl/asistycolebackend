const express = require("express");
const router = express.Router();
const config_horariosController = require("../controllers/config_horarios.controller");
const { verificarToken } = require("../middlewares/autenticacion.middleware");

router.get("/", verificarToken, config_horariosController.getConfig);
router.post("/", verificarToken, config_horariosController.updateConfigHorario);

module.exports = router;

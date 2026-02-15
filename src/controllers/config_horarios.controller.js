const prisma = require("../config/prisma");

// Esta es la función que te falta para el GET
exports.getConfig = async (req, res) => {
  try {
    const { colegio_id } = req.usuario;
    const config = await prisma.config_horarios.findUnique({
      where: { colegio_id: parseInt(colegio_id) },
    });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener configuración" });
  }
};

exports.updateConfigHorario = async (req, res) => {
  try {
    // 1. Intentamos sacar el ID del token (para Admins de colegio)
    // 2. Si no hay ID en el token, lo buscamos en el body (para Superadmins)
    const colegio_id = req.usuario.colegio_id || req.body.colegio_id;

    if (!colegio_id) {
      return res.status(400).json({
        error:
          "Se requiere un colegio_id. El Superadmin debe enviarlo en el body.",
      });
    }

    const { hora_entrada, hora_tarde, hora_falta } = req.body;

    const parseTime = (timeStr) => {
      const [hours, minutes, seconds] = timeStr.split(":");
      const d = new Date();
      d.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);
      return d;
    };

    const config = await prisma.config_horarios.upsert({
      where: { colegio_id: parseInt(colegio_id) },
      update: {
        hora_entrada: parseTime(hora_entrada),
        hora_tarde: parseTime(hora_tarde),
        hora_falta: parseTime(hora_falta),
      },
      create: {
        colegio_id: parseInt(colegio_id),
        hora_entrada: parseTime(hora_entrada),
        hora_tarde: parseTime(hora_tarde),
        hora_falta: parseTime(hora_falta),
      },
    });

    res.json({ mensaje: "Horarios configurados con éxito", config });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar horarios", detalle: error.message });
  }
};

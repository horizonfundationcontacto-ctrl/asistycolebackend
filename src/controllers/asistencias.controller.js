const prisma = require("../config/prisma");

exports.marcarAsistencia = async (req, res) => {
  try {
    const { codigo_qr } = req.body;
    const { id: trabajador_id, colegio_id } = req.usuario;

    // 1. Buscar al alumno y traer la cadena de IDs
    const alumno = await prisma.alumnos.findUnique({
      where: { codigo_qr },
      include: {
        secciones: {
          include: {
            grados: true, // Aquí obtenemos el colegio_id indirectamente
          },
        },
      },
    });

    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

    // 2. Obtener el colegio_id del alumno (seguridad extra)
    const alumnoColegioId = alumno.secciones.grados.colegio_id;

    // 3. Buscar la configuración directamente (Más rápido y seguro)
    const config = await prisma.config_horarios.findUnique({
      where: { colegio_id: alumnoColegioId },
    });

    if (!config) {
      return res.status(400).json({
        error: "El colegio no tiene horarios configurados",
        debug_info: { alumno_colegio: alumnoColegioId },
      });
    }

    // 4. Lógica de tiempo (Igual que antes)
    const ahora = new Date();
    const horaActualStr = ahora.toTimeString().split(" ")[0];

    const extraerHora = (dateObj) => {
      return dateObj instanceof Date
        ? dateObj.toISOString().split("T")[1].split(".")[0]
        : dateObj;
    };

    const hTarde = extraerHora(config.hora_tarde);
    const hFalta = extraerHora(config.hora_falta);

    let estado = "PUNTUAL";
    if (horaActualStr >= hFalta) estado = "FALTA";
    else if (horaActualStr >= hTarde) estado = "TARDE";

    // 5. Registrar
    const nuevaAsistencia = await prisma.asistencias.create({
      data: {
        alumno_id: alumno.id,
        trabajador_id: trabajador_id,
        fecha: ahora,
        hora_escaneo: ahora,
        estado: estado,
      },
    });

    res.json({
      mensaje: `Asistencia registrada: ${estado}`,
      alumno: alumno.nombres,
      estado: estado,
      hora_marcada: horaActualStr,
    });
  } catch (error) {
    console.error("ERROR EN ASISTENCIA:", error);
    res.status(500).json({ error: "Error interno", detalle: error.message });
  }
};

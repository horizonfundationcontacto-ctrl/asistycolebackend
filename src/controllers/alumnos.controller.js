const prisma = require("../config/prisma");

// REGISTRAR ALUMNO
exports.createAlumno = async (req, res) => {
  try {
    const { nombres, dni, seccion_id, apoderado_id } = req.body;

    // 1. Validaciones básicas
    if (!nombres || !dni || !seccion_id) {
      return res
        .status(400)
        .json({ error: "Nombres, DNI y Sección son obligatorios" });
    }

    // 2. Crear el alumno
    // Nota: El codigo_qr se genera solo en la DB por el default(uuid_generate_v4())
    const nuevoAlumno = await prisma.alumnos.create({
      data: {
        nombres,
        dni,
        seccion_id: parseInt(seccion_id),
        apoderado_id: apoderado_id ? parseInt(apoderado_id) : null,
        estado_activo: true,
      },
      // Incluimos la relación para verificar a qué colegio pertenece
      include: {
        secciones: {
          include: {
            grados: {
              include: { colegios: true },
            },
          },
        },
      },
    });

    res.status(201).json({
      mensaje: "Alumno registrado exitosamente",
      alumno: {
        id: nuevoAlumno.id,
        nombres: nuevoAlumno.nombres,
        codigo_qr: nuevoAlumno.codigo_qr, // Este es el que usarás para el fotocheck
        colegio: nuevoAlumno.secciones.grados.colegios.nombre,
      },
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "El DNI o el Código QR ya existen" });
    }
    res.status(500).json({ error: "Error al registrar el alumno" });
  }
};

// OBTENER ALUMNOS POR SECCIÓN (Para el listado del profesor)
exports.getAlumnosPorSeccion = async (req, res) => {
  try {
    const { seccionId } = req.params;

    const alumnos = await prisma.alumnos.findMany({
      where: { seccion_id: parseInt(seccionId) },
      orderBy: { nombres: "asc" },
    });

    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
};

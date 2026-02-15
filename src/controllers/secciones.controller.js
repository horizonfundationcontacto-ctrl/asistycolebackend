const prisma = require("../config/prisma");

exports.createSeccion = async (req, res) => {
  try {
    const { grado_id, letra, trabajador_id } = req.body;

    const nuevaSeccion = await prisma.secciones.create({
      data: {
        grado_id: parseInt(grado_id),
        letra: letra.toUpperCase().trim(),
        trabajador_id: trabajador_id ? parseInt(trabajador_id) : null,
      },
    });
    res.status(201).json(nuevaSeccion);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Esa letra de sección ya existe para este grado" });
  }
};

exports.getSeccionesPorGrado = async (req, res) => {
  try {
    const { gradoId } = req.params;

    const secciones = await prisma.secciones.findMany({
      where: { grado_id: parseInt(gradoId) },
      include: {
        grados: {
          include: {
            cat_grados: true, // Traemos el nombre real ("1RO PRIMARIA") desde el catálogo
          },
        },
      },
    });

    // Formateamos la respuesta para que el frontend lo tenga fácil
    const respuestaFormateada = secciones.map((s) => ({
      id: s.id,
      letra: s.letra,
      nombre_completo: `${s.grados.cat_grados.nombre} - SECCIÓN ${s.letra}`,
      trabajador_id: s.trabajador_id,
    }));

    res.json(respuestaFormateada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener secciones" });
  }
};

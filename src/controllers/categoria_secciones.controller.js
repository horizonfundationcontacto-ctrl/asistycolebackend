const prisma = require("../config/prisma");

// Crear una letra/nombre de sección en el catálogo (Ej: "A", "B", "ÚNICA")
exports.createCatSeccion = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: "El nombre de la sección es requerido" });
    }

    const nuevaSeccionMaestra = await prisma.cat_secciones.create({
      data: {
        nombre: nombre.toUpperCase().trim(),
      },
    });

    res.status(201).json(nuevaSeccionMaestra);
  } catch (error) {
    // Error P2002 es duplicado en Prisma
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Esta sección ya existe en el catálogo maestro" });
    }
    res.status(500).json({ error: "Error al crear la sección maestra" });
  }
};

// Obtener todas las secciones del catálogo
exports.getCatSecciones = async (req, res) => {
  try {
    const secciones = await prisma.cat_secciones.findMany({
      orderBy: { nombre: "asc" },
    });
    res.json(secciones);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el catálogo de secciones" });
  }
};

// Eliminar una sección del catálogo (Solo si no está siendo usada)
exports.deleteCatSeccion = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cat_secciones.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Sección eliminada del catálogo" });
  } catch (error) {
    res.status(400).json({
      error:
        "No se puede eliminar: la sección está siendo usada por un colegio",
    });
  }
};

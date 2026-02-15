const prisma = require("../config/prisma");

// OBTENER GRADOS (Filtrados por colegio)
exports.getGrados = async (req, res) => {
  try {
    const { colegio_id, rol } = req.usuario;

    // Si es SUPERADMIN, puede ver todos. Si no, solo los de su colegio.
    const filtro = rol === "SUPERADMIN" ? {} : { colegio_id: colegio_id };

    const grados = await prisma.grados.findMany({
      where: filtro,
      include: { secciones: true }, // Para ver qué secciones tiene cada grado
    });

    res.json(grados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener grados" });
  }
};

// CREAR GRADO
exports.createGrado = async (req, res) => {
  try {
    const { colegio_id, cat_grado_id } = req.body;

    const nuevoGrado = await prisma.grados.create({
      data: {
        colegio_id: parseInt(colegio_id),
        cat_grado_id: parseInt(cat_grado_id),
      },
    });
    res.status(201).json(nuevoGrado);
  } catch (error) {
    // Gracias al @@unique del schema, Prisma lanzará error si intentan duplicar
    res.status(400).json({
      error: "El colegio ya tiene registrado este grado del catálogo",
    });
  }
};

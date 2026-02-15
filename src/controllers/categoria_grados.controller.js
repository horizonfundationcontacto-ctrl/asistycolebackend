const prisma = require("../config/prisma");

exports.createCatGrado = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevo = await prisma.cat_grados.create({
      data: { nombre: nombre.toUpperCase().trim() },
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Este grado ya existe en el catálogo maestro" });
  }
};

exports.getCatGrados = async (req, res) => {
  const lista = await prisma.cat_grados.findMany({
    orderBy: { nombre: "asc" },
  });
  res.json(lista);
};

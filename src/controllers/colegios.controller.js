const prisma = require("../../src/config/prisma");

exports.getColegios = async (req, res) => {
  try {
    const colegios = await prisma.colegios.findMany();
    res.json(colegios);
  } catch (error) {
    res.status(500).json({ error: "Error recuperando colegios" });
  }
};

exports.createColegio = async (req, res) => {
  try {
    const { nombre, ruc, direccion, logo_url } = req.body;
    const nuevoColegio = await prisma.colegios.create({
      data: {
        nombre,
        ruc,
        direccion,
        logo_url,
      },
    });
    res.status(201).json("Colegio creado correctamente" + nuevoColegio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creando colegio" });
  }
};

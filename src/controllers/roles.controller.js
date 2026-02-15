const prisma = require("../config/prisma");

// OBTENER TODOS LOS ROLES
exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener roles" });
  }
};

// CREAR UN NUEVO ROL
exports.createRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoRol = await prisma.roles.create({
      data: { nombre: nombre.toUpperCase() }, // Lo guardamos en mayúsculas por orden
    });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al crear el rol (tal vez ya existe)" });
  }
};

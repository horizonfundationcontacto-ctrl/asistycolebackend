const prisma = require("../../src/config/prisma");

exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

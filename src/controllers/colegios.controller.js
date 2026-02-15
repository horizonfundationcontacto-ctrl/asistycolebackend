const prisma = require("../../src/config/prisma");

exports.getColegios = async (req, res) => {
  try {
    const colegios = await prisma.colegios.findMany({
      include: {
        _count: {
          select: {
            trabajadores: true,
            usuarios: true, // Agregamos usuarios (admins, etc.)
            grados: true, // Agregamos grados
          },
        },
      },
    });
    res.json(colegios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error recuperando colegios" });
  }
};

exports.createColegio = async (req, res) => {
  try {
    const { nombre, ruc, direccion, logo_url } = req.body;

    // 1. Validación básica
    if (!nombre || !ruc) {
      return res.status(400).json({ error: "Nombre y RUC son obligatorios" });
    }

    // 2. Crear el colegio
    const nuevoColegio = await prisma.colegios.create({
      data: {
        nombre,
        ruc,
        direccion,
        logo_url,
      },
    });

    // 3. Respuesta limpia (Mandamos el objeto para sacar el ID después)
    res.status(201).json({
      mensaje: "Colegio creado correctamente",
      data: nuevoColegio,
    });
  } catch (error) {
    // Manejo de error específico para RUC duplicado (P2002 en Prisma)
    if (error.code === "P2002") {
      return res.status(400).json({ error: "El RUC ya está registrado" });
    }

    console.error(error);
    res.status(500).json({ error: "Error interno al crear colegio" });
  }
};

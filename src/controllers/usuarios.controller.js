const prisma = require("../config/prisma");

// Listar todos los usuarios (Vista para el Superadmin)
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      include: {
        rol_relacion: { select: { nombre: true } }, // Trae el nombre del rol
        colegio: { select: { nombre: true } }, // Trae el nombre del colegio
      },
      orderBy: { id: "asc" },
    });

    // Formateamos la respuesta para que sea más limpia
    const respuesta = usuarios.map((u) => ({
      id: u.id,
      nombres: u.nombres,
      email: u.email,
      rol: u.rol_relacion.nombre,
      colegio: u.colegio ? u.colegio.nombre : "SISTEMA (SUPERADMIN)",
      estado: u.estado_activo,
    }));

    res.json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Obtener un solo usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
      include: { rol_relacion: true, colegio: true },
    });

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Actualizar usuario (Cambiar rol, nombre o colegio)
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, email, rol_id, colegio_id, estado_activo } = req.body;

    const usuarioActualizado = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: {
        nombres,
        email,
        rol_id: rol_id ? parseInt(rol_id) : undefined,
        colegio_id:
          rol_id === 1 ? null : colegio_id ? parseInt(colegio_id) : undefined,
        estado_activo,
      },
    });

    res.json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar (o desactivar) usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Opción A: Eliminación física
    await prisma.usuarios.delete({ where: { id: parseInt(id) } });

    // Opción B (Recomendada): Desactivación lógica
    /*
    await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: { estado_activo: false }
    });
    */

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar usuario" });
  }
};

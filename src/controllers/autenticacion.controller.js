const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar en Usuarios (e incluir el nombre del rol desde la tabla maestra)
    let persona = await prisma.usuarios.findUnique({
      where: { email },
      include: { rol_relacion: true }, // Para traer el nombre del rol (SUPERADMIN, etc.)
    });
    let tabla = "usuario";

    // 2. Si no está en Usuarios, buscar en Trabajadores
    if (!persona) {
      persona = await prisma.trabajadores.findUnique({
        where: { email },
        include: { roles: true }, // Suponiendo que trabajadores también usa la tabla roles
      });
      tabla = "trabajador";
    }

    if (!persona) {
      return res.status(404).json({ error: "Credenciales inválidas" });
    }

    // 3. Verificar contraseña
    const passwordValido = await bcrypt.compare(password, persona.password);
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 4. Determinar el ROL real (ahora lo sacamos del objeto relacionado)
    // En usuarios es 'rol_relacion.nombre', en trabajadores es 'roles.nombre'
    const rolNombre =
      tabla === "usuario" ? persona.rol_relacion.nombre : persona.roles.nombre;
    const rolId = tabla === "usuario" ? persona.rol_id : persona.rol_id;

    const token = jwt.sign(
      {
        id: persona.id,
        rol_nombre: rolNombre,
        rol_id: rolId,
        colegio_id: persona.colegio_id,
        tipo_tabla: tabla,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      token,
      usuario: {
        nombres: persona.nombres,
        rol: rolNombre,
        colegio_id: persona.colegio_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.register = async (req, res) => {
  try {
    const { nombres, email, password, rol_id, colegio_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lógica inteligente: Si el rol_id es 1 (SUPERADMIN), forzamos colegio_id a null
    // Usamos parseInt para asegurar que el ID sea un número
    const rId = parseInt(rol_id);

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombres,
        email,
        password: hashedPassword,
        rol_id: rId,
        colegio_id: rId === 1 ? null : parseInt(colegio_id),
      },
      // Incluimos el rol en la respuesta para confirmar
      include: { rol_relacion: true },
    });

    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      usuario: {
        id: nuevoUsuario.id,
        nombres: nuevoUsuario.nombres,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol_relacion.nombre,
        colegio_id: nuevoUsuario.colegio_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al registrar: " + error.message });
  }
};

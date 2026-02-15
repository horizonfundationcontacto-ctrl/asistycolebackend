const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando el seedeo de tablas maestras...");

  // --- LIMPIEZA OPCIONAL (Para evitar errores de duplicados si reinicias) ---
  // Nota: Si ya tienes registros en 'trabajadores' o 'usuarios', borra con cuidado.
  // await prisma.roles.deleteMany({});

  // 1. Seed de ROLES con IDs FIJOS
  // Esto es vital para que tu lógica de controladores (if rol_id === 1) funcione siempre.
  const roles = [
    { id: 1, nombre: "SUPERADMIN" },
    { id: 2, nombre: "ADMIN_COLEGIO" },
    { id: 3, nombre: "DIRECTOR" },
    { id: 4, nombre: "PROFESOR" },
    { id: 5, nombre: "ADMINISTRATIVO" },
    { id: 6, nombre: "AUXILIAR" },
    { id: 7, nombre: "OTRO" },
  ];

  for (const rol of roles) {
    await prisma.roles.upsert({
      where: { id: rol.id },
      update: { nombre: rol.nombre },
      create: rol,
    });
  }
  console.log("✅ Roles (Sistema y Personal) cargados");

  // 2. Seed de CATEGORÍA DE GRADOS
  const grados = [
    { nombre: "1RO PRIMARIA" },
    { nombre: "2DO PRIMARIA" },
    { nombre: "3RO PRIMARIA" },
    { nombre: "4TO PRIMARIA" },
    { nombre: "5TO PRIMARIA" },
    { nombre: "6TO PRIMARIA" },
    { nombre: "1RO SECUNDARIA" },
    { nombre: "2DO SECUNDARIA" },
    { nombre: "3RO SECUNDARIA" },
    { nombre: "4TO SECUNDARIA" },
    { nombre: "5TO SECUNDARIA" },
  ];

  for (const grado of grados) {
    await prisma.cat_grados.upsert({
      where: { nombre: grado.nombre },
      update: {},
      create: grado,
    });
  }
  console.log("✅ Catálogo de grados cargado");

  // 3. Seed de CATEGORÍA DE SECCIONES
  const secciones = [
    { nombre: "A" },
    { nombre: "B" },
    { nombre: "C" },
    { nombre: "D" },
    { nombre: "E" },
    { nombre: "ÚNICA" },
  ];

  for (const seccion of secciones) {
    await prisma.cat_secciones.upsert({
      where: { nombre: seccion.nombre },
      update: {},
      create: seccion,
    });
  }
  console.log("✅ Catálogo de secciones cargado");

  console.log("\n🚀 Seedeo completado con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seedeo:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

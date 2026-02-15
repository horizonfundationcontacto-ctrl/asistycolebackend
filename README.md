# 🚀 AsistyCole Backend

**AsistyCole** es una API REST robusta diseñada para la gestión académica, permitiendo el control de colegios, roles y usuarios. Este proyecto es el núcleo del sistema de asistencia y gestión desarrollado por **Horizon Foundation**.

---

## 🛠️ Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js
* **Framework Web:** Express.js
* **ORM:** Prisma
* **Base de Datos:** PostgreSQL (Desplegada en Supabase)
* **Variables de Entorno:** Dotenv
* **Seguridad:** CORS

---

## Estructura del Proyecto

```text
asisticole-backend/
├── prisma/               # Configuración y esquema de base de datos
│   └── schema.prisma
├── src/
│   ├── config/           # Configuraciones (Prisma Client, Supabase)
│   ├── controllers/      # Lógica de negocio y funciones
│   ├── routes/           # Definición de endpoints y rutas
│   └── index.js          # Punto de entrada de la aplicación
├── .env                  # Variables de entorno (Ignorado en Git)
└── package.json          # Dependencias y scripts

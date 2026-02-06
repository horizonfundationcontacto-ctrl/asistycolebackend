const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
// nota para mi: cors permite la comunicacion de diferentes dominios y express.json para entender JSON
app.use(cors());
app.use(express.json());

// Rutas centralizadas
// Ahora todas tus rutas colgarán de aquí (ej: http://localhost:3000/roles)
app.use("/", require("./src/app"));

// Abrimos la app en el puerto seteado
app.listen(PORT, () => {
  console.log(`
    AsystyCole - Servidor backend
    ---------------------------
    🚀 Servidor corriendo en el puerto: http://localhost:${PORT}
    ---------------------------
    Desarrollado por Horizon Foundation
  `);
});

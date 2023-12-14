
import express from 'express';
import initDB from './initDB.js';

initDB();

const app = express();

// Configuraciones middleware

// Rutas

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

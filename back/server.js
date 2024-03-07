const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const interviewRoutes = require('./interviewRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes); // Rutas relacionadas con el usuario
app.use('/api', interviewRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});


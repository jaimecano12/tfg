// Importa las bibliotecas necesarias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configuración de Express
const app = express();
const PORT = 3001; // Puedes cambiar el puerto si es necesario

// Conexión a MongoDB (asegúrate de tener MongoDB instalado y en ejecución)
mongoose.connect('mongodb://localhost/jobgenius', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definición del modelo de usuario
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifica si el usuario ya está registrado
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Crea un nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

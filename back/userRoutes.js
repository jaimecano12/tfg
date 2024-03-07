const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/jobgenius', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Modelo de usuario
const User = mongoose.model('User', userSchema);

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    const existingName = await User.findOne({username});
    if (existingName) {
      return res.status(400).json({ error: 'Nombre de usuario en uso, por favor utilize otro.' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito', username: username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Usuario autenticado correctamente
    res.status(200).json({ message: 'Inicio de sesión exitoso', username: user.username  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


module.exports = router;

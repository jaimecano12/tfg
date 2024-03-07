// interviewRoutes.js

const express = require('express');
const router = express.Router();

const userResponses = []; // Almacena respuestas en memoria (¡Esto es solo un ejemplo!)

// Ruta para la lógica de la entrevista
router.post('/interview', async (req, res) => {
  try {
    const interviewQuestions = await generateInterviewQuestions(); // Implementa tu lógica
    res.json({ questions: interviewQuestions });
  } catch (error) {
    console.error('Error al generar preguntas de entrevista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para manejar las respuestas del usuario
router.post('/interview/submit', (req, res) => {
  const userResponse = req.body.response;
  userResponses.push(userResponse); // Almacena la respuesta (¡Esto es solo un ejemplo!)
  res.json({ success: true });
});

module.exports = router;
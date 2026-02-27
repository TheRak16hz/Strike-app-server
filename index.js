const express = require('express');
const cors = require('cors');
require('dotenv').config();
const habitRoutes = require('./routes/habits');
const startCron = require('./cron');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint de salud para que Render no se duerma
app.get('/api/health', (req, res) => {
    res.status(200).send('Servidor Despierto 🚀');
});

app.use('/api/habits', habitRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  
  // Iniciamos el Cron local si estamos en producción (o siempre) para engañar a Render
  startCron();
});

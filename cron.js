const https = require('https');

// La URL de tu backend en Render. Si aún no la tienes, esto pigneará en local por ahora
// Deberás definir RENDER_EXTERNAL_URL en las variables de entorno de Render
const backendUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;

const pingRender = () => {
    https.get(`${backendUrl}/api/health`, (res) => {
        if (res.statusCode === 200) {
            console.log(`[Cron] Backend pinged successfully at ${new Date().toISOString()}`);
        } else {
            console.error(`[Cron] Backend ping failed with status code: ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.error('[Cron] Error pinging backend:', err.message);
    });
};

// Configurar ping cada 14 minutos (14 * 60 * 1000 = 840000 milisegundos)
// Render se apaga a los 15 minutos en la capa gratuita
const startCron = () => {
    console.log('[Cron] Started dummy cron to keep Render awake');
    setInterval(pingRender, 840000);
};

module.exports = startCron;

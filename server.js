const express = require('express');
const { Client } = require('tplink-smarthome-api');

const app = express();
const port = 3000;
const client = new Client();

// Reemplaza con la IP de tu dispositivo TP-Link
const deviceHost = '10.0.1.2';

// Función para encender el enchufe
async function turnOnPlug() {
  try {
    const device = await client.getDevice({ host: deviceHost });
    await device.setPowerState(true);
    console.log('Enchufe encendido');
    return 'Enchufe encendido';
  } catch (error) {
    console.error('Error al encender el enchufe:', error);
    throw error;
  }
}

// Función para apagar el enchufe
async function turnOffPlug() {
  try {
    const device = await client.getDevice({ host: deviceHost });
    await device.setPowerState(false);
    console.log('Enchufe apagado');
    return 'Enchufe apagado';
  } catch (error) {
    console.error('Error al apagar el enchufe:', error);
    throw error;
  }
}

// Endpoint para encender el enchufe
app.post('/encender', async (req, res) => {
  try {
    const message = await turnOnPlug();
    res.send(message);
  } catch (error) {
    res.status(500).send('Error al encender el enchufe');
  }
});

// Endpoint para apagar el enchufe
app.post('/apagar', async (req, res) => {
  try {
    const message = await turnOffPlug();
    res.send(message);
  } catch (error) {
    res.status(500).send('Error al apagar el enchufe');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

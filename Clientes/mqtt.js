import mqtt from 'mqtt';

const Client = mqtt.connect('mqtt://localhost:1883');

Client.on('connect', () => {
    console.log('Cliente conectado a MQTT server');
    Client.publish ('mensaje', 'Matricula : m041218');
    Client.end();
});
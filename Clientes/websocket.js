import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8081'); // Conectar al WebSocket existente

ws.on('open', () => {
    console.log(' Enviando mensaje al servidor WebSocket...');
    ws.send('Matricula: m041218');

    
    ws.close();//cerrar al enviar mensaje
});

ws.on('error', (err) => {
    console.error('Error en WebSocket:', err.message);
});

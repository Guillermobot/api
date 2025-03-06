import express from "express";
import aedes from "aedes";
import net from "net";
import { WebSocketServer } from "ws";

const puertomqtt = 1883;
const puertowebsocket = 8081;

//  Servidor HTTP

// HTTP server
const app = express();
const port = 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Funcionando correctamente ✅ ");
});
app.post("/", (req, res) => {
  console.log(`HTTP Request -> ${JSON.stringify(req.body)}`);
  res.send({ received: req.body });
});
app.listen(port, () => {
  console.log(`REST port -> http://{server}:${port}`);
});
//  Servidor MQTT usando Aedes

const mqttBroker = aedes();
const mqttServer = net.createServer(mqttBroker.handle);

mqttServer.listen(puertomqtt, () => {
  console.log(`✅  Servidor MQTT funcionando en puerto ${puertomqtt}`);
});

mqttBroker.on("client", (client) => {
  console.log(`Cliente MQTT conectado: ${client.id}`);
});

mqttBroker.on("publish", (packet, client) => {
  if (client) {
    console.log(
      `MQTT Mensaje recibido de ${client.id}: ${packet.payload.toString()}`
    );
  }
});

mqttBroker.on("clientDisconnect", (client) => {
  console.log(`Cliente MQTT desconectado: ${client.id}`);
});

//  Servidor WebSocket

const wss = new WebSocketServer({ port: puertowebsocket });

wss.on("connection", (ws) => {
  console.log("Cliente conectado a WebSocket");
  ws.send("Matricula: m041218");

  ws.on("message", (message) => {
    console.log("WebSocket mensaje recibido:", message.toString());
  });

  ws.on("close", () => {
    console.log("Cliente desconectado de WebSocket");
  });
});

console.log(`✅  Servidor WebSocket funcionando en puerto ${puertowebsocket}`);

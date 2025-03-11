import express from "express";




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

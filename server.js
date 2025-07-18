const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let lastOrder = null;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  lastOrder = req.body;
  console.log('Neue Bestellung empfangen:', lastOrder.name);
  res.sendStatus(200);
});

app.get('/latest-order', (req, res) => {
  if (!lastOrder) return res.status(204).send();
  res.json(lastOrder);
  lastOrder = null;
});

app.get('/', (req, res) => res.send('Läuft'));
app.listen(3000, () => console.log('Server aktiv auf Port 3000'));

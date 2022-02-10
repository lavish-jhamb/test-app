const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const Gun = require('Gun')

const PORT = 3000 || process.env.PORT;

const app = express();

app.use(Gun.serve);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const server = app.listen(PORT, () =>
  console.log('Express server is running on localhost:3001')
);

Gun({ file: 'db', web: server });
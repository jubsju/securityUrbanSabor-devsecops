const express = require('express');
const _ = require('lodash');

const app = express();

app.get('/', (req, res) => {
  res.send(_.capitalize('security Urban Sabor - versão 1.0'));
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;

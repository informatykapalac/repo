const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
//app.use('/php', express.static(path.join(__dirname, 'public/PHP')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', function(req, res) {
  const data = req.body.data;
  console.log("HI");
});

app.post('/login', function(req, res) {
  const data = req.body.data;
  console.log("LOGIN");
});

app.post('/game-data', function(req, res) {
  const data = req.body.data;
  console.log("DATA");
});

app.listen(process.env.PORT || 8080);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
//app.use('/php', express.static(path.join(__dirname, 'public/PHP')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  const data = req.body.data;
  console.log("HI");
});

app.listen(process.env.PORT || 8080);

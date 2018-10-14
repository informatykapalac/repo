const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.post('/', function(req, res) {
  console.log("HI");
});

app.listen(process.env.PORT || 8080);

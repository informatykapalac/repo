const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const uuidv4 = require('uuid/v4');
const sha512 = require('js-sha512');
const auth_token = require('./src/Algorithm');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
//app.use('/php', express.static(path.join(__dirname, 'public/PHP')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', function(req, res) {
  const data = req.body.data;

  const user = data.name;
  const pass = data.pass;
  const email = data.email;

  // Sprawdzić ponownie kompatybilność nazwy użytkownika oraz hasła

  // Stworzyć token do rejestracji

  const regex = /[-]+/g;
  const token = uuidv4().replace(regex, '');

  // Stworzyć hash do autentyfikacji użytkownika w aplikacji

  const hash = sha512(pass);

  // Stworzyć funkcję ( w zewnętrznym pliku ) do stworzenia auth_token

  const db = mysql.createConnection({
    host: '85.10.205.173',
    port: 3306,
    user: 'admin_41487',
    password: '1q2w3e4r',
    database: 'game_data'
  });

  // ZAPYTANIA INSERT MAJĄ POZOSTAĆ W KOMENTARZACH !!!

  db.connect();

  db.query('SELECT `name` FROM `users` WHERE `name` = "' + user + '"' , function(err, res, info) {
    console.log(err);
    console.log(res);
    console.log(info);
  });

  /*db.query('INSERT INTO `users` (`email`, `name`, `password`, `hash`) VALUES ("' + email + '","' + user + '","' + pass + '","' + hash + '")', function(err, res, info) {
    console.log(err);
    console.log(res);
    console.log(info);
  });*/

  db.query('SELECT `id` FROM `users` WHERE `name` = "' + user + '" AND `password` = "' + pass + '"', function(err, res, info) {
    console.log(err);
    console.log(res);
    console.log(info);
  });

  let time = new Date().getTime() / 1000;
  time = parseInt(time) + 3600;

  /*db.query('INSERT INTO `register` (`user_id`, `token`, `expires`) VALUES ( ,"' + token + '","' + time + '")', function(err, res, info) {
    console.log(err);
    console.log(res);
    console.log(info);
  });*/

  db.end();
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

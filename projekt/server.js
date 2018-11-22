const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuid/v4');
const sha512 = require('js-sha512');
const algo = require('./src/Algorithm');
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
  // Sprawdzić ponownie kompatybilność nazwy użytkownika oraz hasła.

  // Stworzyć token do rejestracji

  const regex = /[-]+/g;
  const token = uuidv4().replace(regex, '');

  // Stworzyć hash do autentyfikacji użytkownika w aplikacji

  const hash = sha512(pass);

  // auth_token w wersji alpha

  const auth_token = algo.auth(hash, token);

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

  // Maile będą wysyłane przez Nodemailer

});

app.post('/login', function(req, res) {
	const data = req.body.data;

	const user = data.name;
	const pass = data.pass;

  const reg=/^[a-zA-Z0-9]{1,}$/;

  const db = mysql.createConnection({
		host: '85.10.205.173',
		port: 3306,
		user: 'admin_41487',
		password: '1q2w3e4r',
		database: 'game_data'
	});

  window.sessionStorage.removeItem('error');
	db.connect(err => {
		if(err){
			send={ info: "Problemy z połączeniem."};
		}
	});
	if (reg.test(user)){
		if (reg.test(pass)){
			db.query("SELECT * FROM users WHERE name='username'", (err, results, fields)=>{
				const numrows=results.length;
				if (numrows==1){
					const hash = sha512(pass);
					db.query("SELECT * FROM users WHERE password='password' OR hash='hash'", (err, results, fields)=>{
						const numrows=results.length;
						if (numrows==1){
							//bla bla trolololo
						}else{
							const send={info: "Niepoprawne hasło."};
						}
					});
				}else{
					const send={info: "Niepoprawny nick."};
				}
			});
		}else{
			const send={info: "Tylko znaki alfanumeryczne w nicku!!!"};
		}
	}else{
		const send={info: "Tylko znaki alfanumeryczne w haśle!!!"};
	}
	/*if (send != ""){
	window.sessionStorage.setItem('error', send);
	}*/
	db.end();
});

app.post('/game-data', function(req, res) {
  const data = req.body.data;
  console.log("DATA");
});

app.listen(process.env.PORT || 8080);

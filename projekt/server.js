const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
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

  // Sprawdzić ponownie kompatybilność nazwy użytkownika oraz hasła

  // Stworzyć token do rejestracji

  const regex = /[-]+/g;
  const token = uuidv4().replace(regex, '');

  // Stworzyć hash do autentyfikacji użytkownika w aplikacji

  const hash = sha512(pass);

  // auth_token w wersji demo (nie do użytku oficjalnego !!!)

  const auth_token = algo.auth(hash, token);

  const db = mysql.createConnection({
    host: '85.10.205.173',
    port: 3306,
    user: 'admin_41487',
    password: '1q2w3e4r',
    database: 'game_data'
  });
  function logowanie(){
	const reg=/^[a-zA-Z0-9]{3,}$/;
	const connection=mysql.createConnection(config);
	connection.connect(err => {
		if(err){
			alert("test1");
		}
	});
	if (reg.test(username)){
		if (reg.test(username)){
			app.all('/', (req, res)=>{
				connection.query("SELECT * FROM users WHERE 'username'=name", (err, results, fields)=>{
					const numrows=results.length;
					if (numrows==1){
						connection.query("SELECT * FROM users WHERE 'password'=password", (err, results, fields)=>{
							const numrows=results.length;
							if (numrows==1){
								alert("test2");
							}else{
								alert("test3");
							}
						});
					}else{
						alert("test4");
					}
				});
			});
		}else{
			alert("test5");
		}
	}else{
		alert("test6");
	}
	connection.end();
	alert("test7.1");
  }
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

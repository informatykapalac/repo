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
  let userID = -1;
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

  db.connect();

  db.query('SELECT `name` FROM `users` WHERE `name` = "' + user + '"' , function(err, resp, info) {
    if(err) {
      res.status(500).send("Sprawdź połączenie");
    }
    if(resp[0]) { // konflikt nazw użytkowników
      res.status(409).send("Nazwa użytkownika jest już zajęta");
      return;
    }

    db.query('INSERT INTO `users` (`email`, `name`, `hash`, `token`) VALUES ("' + email + '","' + user + '","' + hash + '","' + auth_token + '")', function(err, resp, info) {
      if(err) {
        res.status(500).send("Sprawdź połączenie");
      }
    });

    db.query('SELECT `id` FROM `users` WHERE `name` = "' + user + '" AND `hash` = "' + hash + '"', function(err, resp, info) {
      if(err) {
        res.status(500).send("Sprawdź połączenie");
      }
      userID = resp[0].id; // ID użytkownika z bazy danych
    });

    let time = new Date().getTime() / 1000;
    time = parseInt(time) + 3600; // czas rejestracji

    /*db.query('INSERT INTO `register` (`user_id`, `token`, `expires`) VALUES ("' + userID + '","' + token + '","' + time + '")', function(err, resp, info) {
      if(err) {
        res.status(500).send("Sprawdź połączenie");
      }
    });*/

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sorrowoftomorrow.register@gmail.com',
        pass: '97fc3ab1ac9787d8c9'
      }
    });

    let mailOptions = {
      from: 'Game Dev <sorrowoftomorrow.register@gmail.com>',
      to: email,
      subject: 'Rejestracja konta',
      text: 'Aby odczytać tą wiadomość twój klient poczty musi obsługiwać HTML',
      html: '<p>TBD</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        res.status(500).send("Sprawdź połączenie");
      }
      console.log(info);
    });

    db.end();

  });

});

app.post('/login', function(req, res) {
	const data = req.body.data;

	const user = data.name;
	const pass = data.pass;

  const userRegex = new RegExp(/^[\w]{2,20}$/);
  const emailRegex = new RegExp(/^[-\w\.]+@([-\w]+\.)+[a-z]+$ /);
  const passRegex = new RegExp(/^[\w]{8,30}$/);

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
			send={ info: "Problemy z połączeniem. Przepraszamy."};
		}
	});
	if (userRegex.test(user) || emailRegex.test(user)){
		if (passRegex.test(pass)){
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
			const send={info: "Tylko znaki alfanumeryczne w nicku!"};
		}
	}else{
		const send={info: "Tylko znaki alfanumeryczne w haśle!"};
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

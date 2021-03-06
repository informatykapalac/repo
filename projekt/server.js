const createStore = require('redux');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', function(req, res) {
  const data = req.body.data;

	const user = data.name;
	const pass = data.pass;
	const email = data.email;
  let userID = -1;

  // Stworzyć token do rejestracji

  const regex = /[-]+/g;
  const token = uuidv4().replace(regex, '');

  // Stworzyć hash do autentyfikacji użytkownika w aplikacji

	const hash = sha512(pass);

  // Sprawdzić ponownie kompatybilność nazwy użytkownika oraz hasła.

	const userRegex = new RegExp(/^[\w]{2,20}$/);
	const emailRegex = new RegExp(/^[-\w\.]+@([-\w])+\.\w{2,5}$/);
	const passRegex = new RegExp(/^[\w]{8,30}$/);

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

	if(emailRegex.test(email)){
		if(userRegex.test(user)){
			if(passRegex.test(pass)){
        db.query('SELECT `name` FROM `users` WHERE `name` = "' + user + '"' , function(err, resp, info) {
					if(err) {
						res.status(500).send("Sprawdź połączenie 0");
					}
					if(resp[0]) { // konflikt nazw użytkowników
						res.status(409).send("Nazwa użytkownika jest już zajęta");
						return;
			    } else {
            db.query('INSERT INTO `users` (`email`, `name`, `hash`, `token`) VALUES ("' + email + '","' + user + '","' + hash + '","' + auth_token + '")', function(err, resp, info) {
              if(err) {
                res.status(500).send("Sprawdź połączenie 1");
              }

              db.query('SELECT `id` FROM `users` WHERE `name` = "' + user + '" AND `hash` = "' + hash + '"', function(err, resp, info) {
      					if(err) {
      						res.status(500).send("Sprawdź połączenie 2");
      					}
      					userID = resp[0].id; // ID użytkownika z bazy danych

                let time = new Date().getTime() / 1000;
        				time = parseInt(time) + 3600; // czas rejestracji

                db.query('INSERT INTO `register` (`user_id`, `token`, `expires`) VALUES ("' + userID + '","' + token + '","' + time + '")', function(err, resp, info) {
      						if(err) {
                    console.log(err);
      							res.status(500).send("Sprawdź połączenie 3");
      						}

                  let transporter = nodemailer.createTransport({
        						service: 'gmail',
        						auth: {
        							user: 'sorrowoftomorrow.register@gmail.com',
        							pass: '97fc3ab1ac9787d8c9'
        						}
        					});

                  const address = "http://localhost:3000/check/" + user + "/" + auth_token; // ADRES TYMCZASOWY
                  const address2 = "#";

        					let mailOptions = {
        						from: 'Game Dev <sorrowoftomorrow.register@gmail.com>',
        						to: email,
        						subject: 'Rejestracja konta',
        						text: 'Aby odczytać tą wiadomość twój klient poczty musi obsługiwać HTML',
        						html: "<center><div><h1>Gratulacje, zarejestrowałeś sie na <strong><em>Sorrow of Tommorow</em></strong></h1><h3>Aby dokończyć proces rejestracji, klinkij w link poniżej.</h3><h2><a href='" + address + "'>Potwierdź</a></h2><h3>Jeżeli to nie ty powinieneś być adresatem tej wiadomości, kliknij w link poniżej. Spowoduje to usunięcie konta <strong><em>Sorrow of Tommorow</em></strong></h3><h2><a href='" + address2 + "'>To nie ja</a></h2></div></center></body>"
        					};

                  console.log(mailOptions.html);

        					transporter.sendMail(mailOptions, (error, info) => {
        						if(error) {
        							res.status(500).send("Sprawdź połączenie");
        						}
        						console.log(info);
        					});

      					});

                db.end();

      				});
            });
          }
        });

			}else{
        res.status(409).send("Hasło nie jest poprawne.");
			}
		}else{
			res.status(409).send("Nazwa użytkownika nie jest poprawna.");
		}
	}else{
		res.status(409).send("Email nie jest poprawny.");
	}

});

app.post('/activate', function(req, res) {
  const data = req.body.data;

  const name = data.name;
  const token = data.token;

  // RegEx name and token -> do zrobienia

  const db = mysql.createConnection({
		host: '85.10.205.173',
		port: 3306,
		user: 'admin_41487',
		password: '1q2w3e4r',
		database: 'game_data'
	});

  db.connect();

  db.query('UPDATE `users` SET `activated` = 1 WHERE `name` = "' + name + '" AND `token` = "' + token + '"',
  function(err, resp, info) {
    if(err) {
      res.status(500).send("Sprawdź połączenie");
    } else if(resp.changedRows < 1) {
      res.status(400).send("Nie znaleziono konta"); // RegFail
    } else {
      res.status(200).send("OK"); // RegConfirm
    }
  });

  db.end();
});

app.post('/login', function(req, res) {
	const data = req.body.loginData;
	let user = data.name;
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
	db.connect(err => {
		if(err){
			res.status(500).send("Sprawdź połączenie");
		}
	});
	if (userRegex.test(user) || emailRegex.test(user)){
		if (passRegex.test(pass)){
			db.query('SELECT `*` FROM `users` WHERE `name`="'+user+'" OR `email`="'+user+'"', (err, results, fields)=>{
				if(err) {
					res.status(500).send("Sprawdź połączenie");
				}else{
					const numrows=results.length;
					if (numrows==1){
						const hash = sha512(pass);
						db.query('SELECT `*` FROM `users` WHERE `name`="'+user+'" AND `hash`="'+hash+'"', (err, results, fields)=>{
							if(err) {
								res.status(500).send("Sprawdź połączenie");
							}
							const numrowsa=results.length;
							if (numrowsa==1){
								res.status(200).send({
									id: results.user_ID,
									name: user
								});
							}else{
								res.status(409).send("Hasło nie jest poprawne.");
							}
						});
						db.end();
					}else{
						res.status(409).send("Nazwa użytkownika nie jest poprawna.");
					}
				}
			});
		}else{
			res.status(409).send("Hasło nie jest poprawne.");
		}
	}else{
		res.status(409).send("Nazwa użytkownika nie jest poprawna.");
	}
});

app.post('/game-data', function(req, res) {
	const data = req.body.data;
	const id = data.userID;
	const db = mysql.createConnection({
		host: '85.10.205.173',
		port: 3306,
		user: 'admin_41487',
		password: '1q2w3e4r',
		database: 'game_data'
	});
	db.connect(err => {
		if(err) {
			res.status(500).send("Sprawdź połączenie");
		}
	});
	db.query('SELECT `*` FROM `Dane_userow` WHERE `id`="'+user_ID+'"', (err, results, fields)=>{
		if(err) {
			res.status(500).send("Sprawdź połączenie");
		} 
		const x=results.position.x;
		const y=results.position.y;
		const map=results.position.map;
		res.status(200).send({
			lvl: results.lvl,
			lp: results.lp,
			dp: results.dp,
			credits: results.credits,
			mana: results.mana,
			items: results.items,
			questsw: results.questsw,
			questso: results.questso,
			x: x,
			y: y,
			map: map
		});		
	});
	db.end();
});
app.post('/saveing', function(req, res) {
	const data = req.body.data;
	const id = data.userID;
	const db = mysql.createConnection({
		host: '85.10.205.173',
		port: 3306,
		user: 'admin_41487',
		password: '1q2w3e4r',
		database: 'game_data'
	});
	db.connect(err => {
		if(err) {
			res.status(500).send("Sprawdź połączenie");
		}
	});
	db.query('UPDATE `Dane_userow` SET `lvl`="'+data.lvl+'" `lp`="'+data.lp+'" `dp`="'+data.dp+'" `credits`="'+data.credits+'" `mana`="'+data.mana+'" `items`="'+data.items+'" `items`="'+data.items+'" `questsw`="'+data.questsw+'" `questso`="'+data.questso+'" `position`="'+data.position+'" WHERE `user_ID`="'+id+'" ', (err, results, fields)=>{
		if(err) {
			res.status(500).send("Sprawdź połączenie");
		}
	});
	db.end();
});

app.listen(process.env.PORT || 8080);

<?php
	session_start();
	$nick=$_POST['nick'];  //przechwycenie hsła i nicku
	$haslo=$_POST['haslo'];
	if($nick=="" || $haslo==""){     //sprawdzanie, czy jest ktoś nie wszedł tu złośliwie przez zmianę adresu
		header("LOCATION: Login.js");
	}
	require_once("config.php");  //wywołanie config
	$polaczenie=@new mysqli('DB_HOST','DB_USERNAME','DB_PASSWORD','DB_NAME');
	if($polaczenie->errno!=0){    //sprawdzanie, czy są errory
		header("LOCATION: Login.js");  //jeżeli coś pójdzie nie tak, wróć na stronę logowania
	}else{
		if(ctype_alnum($nick)==false || ctype_alnum($haslo)==false){    //proste zabezpieccenie przed mysql injecting
			header("LOCATION: Login.js");
		}else{
			$hash=password_hash($haslo, PASSWORD_DEFAULT);  //hashowanie hasła
			if($odpowiedz=@$polaczenie->query("SELECT FROM users WHERE '$nick'=name"){   //sprawdzanie istnienia gracza o danym loginie
				if($odpowiedz->num_rows==1){  //sprawdzanie istnienia gracza o danym loginie
					if(@$polaczenie->query("SELECT FROM users WHERE '$hash'=hash"){  //sprawdzanie hasła (hasha)
						$danegracza=@$polaczenie->fetch_assoc();   //pobieranie danych gracza zz DB
						$_SESSION['dane']=$danegracza['dane'];   //zapisywanie danych gry do sesji
					}else{
						header("LOCATION: Login.js");
					}
				}else{
					header("LOCATION: Login.js");
				}
			}else{
				header("LOCATION: Login.js");
			}
			$polaczenie->close;  //zamykanie połączenia
		}
	}
?>
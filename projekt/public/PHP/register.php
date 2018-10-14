<?php

header("allow-control-access-origin: * ");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once("config.php");

echo $_POST["data"];

?>

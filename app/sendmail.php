<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Expection.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('info@fls.guru', 'haha');
$mail->addAddress('interst3@interstudycorp.com');
$mail->Subject = 'Hahahahha';

$body = '<h1> Hello world</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p> <strong> Name: </strong>' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['mail']))) {
    $body .= '<p> <strong> E-mail: </strong>' . $_POST['mail'] . '</p>';
}
if (trim(!empty($_POST['mail']))) {
    $body .= '<p> <strong> Message: </strong>' . $_POST['message'] . '</p>';
}
$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Error';
} else {
    $message = 'Ok';
}

$responce = ['message' => $message];
header('Content-type: application/jcon');
echo json_encode($responce);

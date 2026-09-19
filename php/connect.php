<?php

// deets ng sql workbench host
$host = "127.0.0.1";
$user = "root";
$pass = "06192005@Yael"; 
$dbName = "study_space";
$port = 3306;

$conn = mysqli_connect($host, $user, $pass, $dbName, $port);

// Check connection
if (!$conn) {
    die("Connection Faled! Please check:
        1. MySQL service status (Must be Green/Running in XAMPP/WAMP).
        2. Password: '{$pass}' is correct.
        3. Database name: '{$dbName}' is correct.
        Error: " . mysqli_connect_error());
}

?>
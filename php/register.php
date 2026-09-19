<?php
require_once 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = htmlspecialchars(trim($_POST['username']));
    $email = htmlspecialchars(trim($_POST['email']));
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        die("Error: Passwords do not match.");
    }
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $check_sql = "SELECT id FROM users WHERE email = ?";
    // check if email exists

    $insert_sql = "INSERT INTO users (username, email, pWord) VALUES (?, ?, ?)";
    $stmt_insert = $conn->prepare($insert_sql);
    
    if ($stmt_insert === false) {
        die("SQL PREPARE ERROR: Check table/column spelling in register.php. Error: " . $conn->error);
    }

    $stmt_insert->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt_insert->execute()) {
        header("Location: ../main.html"); //success
        exit(); 
    } else {
        die("SQL EXECUTION ERROR: Check your database constraints. Error: " . $stmt_insert->error); //email/username exists
    }

    $stmt_check->close();
    $stmt_insert->close();
    $conn->close();
} else {
    header("Location: ../register.html");
    exit();
}
?>
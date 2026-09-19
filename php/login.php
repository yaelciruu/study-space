<?php
session_start();

require_once 'connect.php';

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $login_identifier = htmlspecialchars(trim($_POST['username'])); 
    $password = $_POST['password'];

    $sql = "SELECT id, username, pWord, created_at FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $login_identifier);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['pWord'])) {

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['created_at'] = $user['created_at'];

            $stmt->close();
            $conn->close();
            
            $username_js = json_encode($user['username']); 
            echo "<script>";
            echo "localStorage.setItem('appUsername', {$username_js});"; 
            echo "window.location.href = '../dashboard.html';";
            echo "</script>";
            exit();

        } else {
            $error = "Invalid username or password.";
        }
    } else {
        $error = "Invalid username or password.";
    }

    $stmt->close();
    $conn->close();
    
    header("Location: ../main.html?error=" . urlencode($error));
    exit();

} else {
    header("Location: ../main.html");
    exit();
}
?>
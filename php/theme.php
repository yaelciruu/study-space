<?php
session_start();
require_once "connect.php"; 

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

// save theme
if ($user_id != 0 && isset($_POST['theme'])) {
    $theme = $_POST['theme']; // 'light' or 'dark'

    $check = $conn->prepare("SELECT id FROM preferences WHERE user_id = ?");
    $check->bind_param("i", $user_id);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        // Update
        $stmt = $conn->prepare("UPDATE preferences SET theme_mode = ? WHERE user_id = ?");
        $stmt->bind_param("si", $theme, $user_id);
    } else {
        // Create new 
        $stmt = $conn->prepare("INSERT INTO preferences (user_id, theme_mode) VALUES (?, ?)");
        $stmt->bind_param("is", $user_id, $theme);
    }
    
    if($stmt->execute()) echo "Theme Saved";
    else echo "Theme Error";
    exit();
}

// save noise
if ($user_id != 0 && isset($_POST['background_noise'])) {
    $noise = $_POST['background_noise']; // e.g., 'rain', 'ocean', 'none'

    $check = $conn->prepare("SELECT id FROM preferences WHERE user_id = ?");
    $check->bind_param("i", $user_id);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        // Update 
        $stmt = $conn->prepare("UPDATE preferences SET background_noise = ? WHERE user_id = ?");
        $stmt->bind_param("si", $noise, $user_id);
    } else {
        // Create new
        $stmt = $conn->prepare("INSERT INTO preferences (user_id, background_noise) VALUES (?, ?)");
        $stmt->bind_param("is", $user_id, $noise);
    }
    
    if($stmt->execute()) echo "Noise Saved";
    else echo "Noise Error";
    exit();
}

?>
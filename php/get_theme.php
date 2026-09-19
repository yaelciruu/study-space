<?php
session_start();
require_once "connect.php"; 

header('Content-Type: application/json');

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

if ($user_id == 0) {
    echo json_encode(['theme_mode' => 'dark', 'background_noise' => 'none']);
    exit();
}

$stmt = $conn->prepare("SELECT theme_mode, background_noise FROM preferences WHERE user_id = ?");

if (!$stmt) {
    echo json_encode(['theme_mode' => 'dark', 'background_noise' => 'none', 'error' => $conn->error]);
    exit();
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'theme_mode' => $row['theme_mode'] ?? 'dark',
        'background_noise' => $row['background_noise'] ?? 'none' 
    ]);
} else {
    echo json_encode(['theme_mode' => 'dark', 'background_noise' => 'none']);
}

$stmt->close();
$conn->close();
?>
<?php
session_start();
require_once "connect.php";

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 1;

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {

    case 'save_note':
        $content = mysqli_real_escape_string($conn, $_POST['content']);
        
        // Check if note exists
        $check = mysqli_query($conn, "SELECT id FROM notes WHERE user_id='$user_id'");
        if (mysqli_num_rows($check) > 0) {
            $sql = "UPDATE notes SET content='$content' WHERE user_id='$user_id'";
        } else {
            $sql = "INSERT INTO notes (user_id, content) VALUES ('$user_id', '$content')";
        }
        
        if (mysqli_query($conn, $sql)) echo "Saved";
        else echo "Error";
        break;

    case 'get_note':
        $sql = "SELECT content FROM notes WHERE user_id = '$user_id' LIMIT 1";
        $result = mysqli_query($conn, $sql);
        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            echo $row['content'];
        }
        break;

    case 'add_task':
        $task_name = mysqli_real_escape_string($conn, $_POST['task_name']);
        if (!empty($task_name)) {
            $stmt = $conn->prepare("INSERT INTO tasks (user_id, task_name) VALUES (?, ?)");
            $stmt->bind_param("is", $user_id, $task_name);
            if ($stmt->execute()) echo $conn->insert_id;
            else echo 0;
        }
        break;

    case 'get_tasks':
        break;

    case 'save_settings':
        $theme = $_POST['theme'];
        $bg = $_POST['background'];
        $noise = $_POST['noise'];
        
        $check = mysqli_query($conn, "SELECT id FROM preferences WHERE user_id='$user_id'");
        if (mysqli_num_rows($check) > 0) {
            $sql = "UPDATE preferences SET theme_mode='$theme', background_option='$bg', active_noise='$noise' WHERE user_id='$user_id'";
        } else {
            $sql = "INSERT INTO preferences (user_id, theme_mode, background_option, active_noise) VALUES ('$user_id', '$theme', '$bg', '$noise')";
        }
        if (mysqli_query($conn, $sql)) echo "Saved";
        break;

    default:
        echo "Invalid Action";
}
?>
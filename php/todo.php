<?php
session_start();
require_once "connect.php"; 

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

if ($user_id == 0) {
    echo "Error: User not logged in";
    exit();
}

switch ($action) {

    case 'add_task':
        $task_name = trim($_POST['task_name']);
        if (!empty($task_name)) {
            $stmt = $conn->prepare("INSERT INTO tasks (user_id, task) VALUES (?, ?)");
            
            if (!$stmt) { echo "SQL Error: " . $conn->error; exit(); }
            
            $stmt->bind_param("is", $user_id, $task_name);
            if ($stmt->execute()) echo $conn->insert_id; 
            else echo "DB Error: " . $stmt->error;
            $stmt->close();
        }
        break;

    case 'get_tasks':
        $sql = "SELECT id, task AS task_name, stats AS status FROM tasks WHERE user_id = ? ORDER BY created_at DESC";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $tasks = [];
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
        echo json_encode($tasks);
        $stmt->close();
        break;

    case 'delete_task':
        $task_id = $_POST['task_id'];
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ii", $task_id, $user_id);
        if ($stmt->execute()) echo "Deleted";
        else echo "Error: " . $stmt->error;
        $stmt->close();
        break;

    case 'update_status':
        $task_id = $_POST['task_id'];
        $status = $_POST['status']; 
        
        $stmt = $conn->prepare("UPDATE tasks SET stats = ? WHERE id = ? AND user_id = ?");
        $stmt->bind_param("sii", $status, $task_id, $user_id);
        if ($stmt->execute()) echo "Updated";
        else echo "Error";
        $stmt->close();
        break;

    case 'edit_task':
        $task_id = $_POST['task_id'];
        $new_name = trim($_POST['task_name']);
        
        if (!empty($new_name)) {
            $stmt = $conn->prepare("UPDATE tasks SET task = ? WHERE id = ? AND user_id = ?");
            $stmt->bind_param("sii", $new_name, $task_id, $user_id);
            if ($stmt->execute()) echo "Edited";
            else echo "Error: " . $stmt->error;
            $stmt->close();
        }
        break;
}

$conn->close();
?>
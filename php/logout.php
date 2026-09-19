<?php
session_start();

$_SESSION = array();

session_destroy();

echo "<script>";
echo "localStorage.removeItem('appUsername');";
echo "localStorage.removeItem('currentFocusGoal');";
echo "localStorage.removeItem('theme');"; 
echo "window.location.href = '../main.html';"; 
echo "</script>";

header("Location: ../main.html");
exit();
?>
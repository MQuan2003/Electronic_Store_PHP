<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "electronic_store";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    exit(); // Không in ra JSON để tránh lỗi header
}

?>

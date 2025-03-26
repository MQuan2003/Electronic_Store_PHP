<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "electronic_store";

try {
    // Kết nối database với PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Bật chế độ báo lỗi
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Mặc định trả về array thay vì object
    ]);
} catch (PDOException $e) {
    // Ẩn lỗi chi tiết khi chạy production, chỉ hiển thị lỗi chung
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

?>

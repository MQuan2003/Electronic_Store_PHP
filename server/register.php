<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(["status" => "error", "message" => "Thiếu thông tin bắt buộc"]);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$phone = !empty($data['phone']) ? trim($data['phone']) : null;
$address = !empty($data['address']) ? trim($data['address']) : null;
$role = isset($data['role']) ? $data['role'] : "user";
$created_at = date("Y-m-d H:i:s");


$checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkEmail->execute([$email]);

if ($checkEmail->rowCount() > 0) {
    echo json_encode(["status" => "error", "message" => "Email đã được đăng ký"]);
    exit;
}


$sql = "INSERT INTO users (name, email, password, phone, address, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute([$name, $email, $password, $phone, $address, $role, $created_at]);
    echo json_encode(["status" => "success", "message" => "Đăng ký thành công"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Lỗi khi đăng ký: " . $e->getMessage()]);
}
?>

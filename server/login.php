<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once "db_connect.php";
require_once "jwt_helper.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['password'])) {
    echo json_encode(["status" => "error", "message" => "Thiếu email hoặc mật khẩu"]);
    exit;
}

$email = trim($data['email']);
$password = $data['password'];

$sql = "SELECT id, name, email, password, role FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(["status" => "error", "message" => "Email không tồn tại"]);
    exit;
}

if (!password_verify($password, $user['password'])) {
    echo json_encode(["status" => "error", "message" => "Mật khẩu không đúng"]);
    exit;
}

$token = createJWT($user['id'], $user['email'], $user['role']);

$response = [
    "status" => "success",
    "message" => "Đăng nhập thành công",
    "token" => $token,
    "user" => [
        "id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "role" => $user['role']
    ]
];

echo json_encode($response);
exit;
?>

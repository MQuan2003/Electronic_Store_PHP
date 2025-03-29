<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; 

try {
    $checkColumn = $conn->query("SHOW COLUMNS FROM products LIKE 'created_at'");
    if ($checkColumn->rowCount() === 0) {
        echo json_encode(["error" => "Cột 'created_at' không tồn tại trong bảng products"]);
        http_response_code(500);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, name, price, discount, image_url FROM products ORDER BY created_at DESC LIMIT 5");
    $stmt->execute();

    $newProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($newProducts ?: []); 
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}
?>

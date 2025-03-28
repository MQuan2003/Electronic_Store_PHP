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
    $checkColumn = $conn->query("SHOW COLUMNS FROM products LIKE 'sales_count'");
    if ($checkColumn->rowCount() === 0) {
        echo json_encode(["error" => "Cột 'sales_count' không tồn tại trong bảng products"]);
        http_response_code(500);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, name, price, discount, image_url FROM products ORDER BY sales_count DESC LIMIT 5");
    $stmt->execute();

    $bestSellers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bestSellers ?: []); 
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}

?>

<?php
header("Access-Control-Allow-Origin: *"); // Cho phép React truy cập
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Xử lý preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; // Kết nối DB bằng PDO

try {
    // Chỉ lấy các trường quan trọng và sắp xếp theo ID
    $stmt = $conn->prepare("SELECT * FROM products ORDER BY id ASC");

    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$products) {
        echo json_encode(["status" => "no_data", "message" => "Không có sản phẩm nào!"]);
    } else {
        echo json_encode($products);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}
?>
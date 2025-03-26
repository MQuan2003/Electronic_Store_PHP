<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; // Kết nối sử dụng PDO

try {
    // Kiểm tra xem cột created_at có tồn tại không
    $checkColumn = $conn->query("SHOW COLUMNS FROM products LIKE 'created_at'");
    if ($checkColumn->rowCount() === 0) {
        echo json_encode(["error" => "Cột 'created_at' không tồn tại trong bảng products"]);
        http_response_code(500);
        exit();
    }

    // Lấy 5 sản phẩm mới nhất
    $stmt = $conn->prepare("SELECT id, name, price, discount, image_url FROM products ORDER BY created_at DESC LIMIT 5");
    $stmt->execute();

    $newProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($newProducts ?: []); // Trả về mảng rỗng nếu không có sản phẩm nào
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}

?>

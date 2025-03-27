<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; // Kết nối database

try {
    if (!isset($_GET['id'])) {
        echo json_encode(["status" => "error", "message" => "Thiếu ID sản phẩm!"]);
        http_response_code(400);
        exit();
    }

    $id = intval($_GET['id']);

    // Truy vấn sản phẩm
    $stmt = $conn->prepare("
        SELECT p.*, c.name AS category_name, b.name AS brand_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.id = ?
    ");
    $stmt->execute([$id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(["status" => "not_found", "message" => "Sản phẩm không tồn tại!"]);
        http_response_code(404);
        exit();
    }

    // Giải mã JSON attributes từ bảng products (nếu có)
    $product["attributes"] = json_decode($product["attributes"], true);

    // Truy vấn đánh giá từ bảng reviews
    $stmt = $conn->prepare("
        SELECT r.*, u.name AS user_name 
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ?
        ORDER BY r.created_at DESC
    ");
    $stmt->execute([$id]);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "product" => $product,
        "reviews" => $reviews // Thêm review vào API
    ]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Lỗi server!", "error" => $e->getMessage()]);
    http_response_code(500);
}
?>

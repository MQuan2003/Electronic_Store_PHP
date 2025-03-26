<?php
header("Access-Control-Allow-Origin: *"); // Cho phép React truy cập
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Xử lý preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; // Kết nối DB bằng PDO

try {
    // Kiểm tra nếu có tham số ID
    if (!isset($_GET['id'])) {
        echo json_encode(["status" => "error", "message" => "Thiếu ID sản phẩm!"]);
        http_response_code(400);
        exit();
    }

    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(["status" => "not_found", "message" => "Sản phẩm không tồn tại!"]);
        http_response_code(404);
    } else {
        echo json_encode(["status" => "success", "data" => $product]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}
?>

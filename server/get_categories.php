<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; // Kết nối database

try {
    // Truy vấn danh mục sản phẩm theo thứ tự id
    $stmt = $conn->prepare("SELECT id, name, icon_class FROM categories ORDER BY id ASC");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($categories ?: []); // Trả về mảng rỗng nếu không có danh mục nào
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}
?>

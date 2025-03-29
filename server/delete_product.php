<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__ . "/db_connect.php"; 
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["status" => "error", "message" => "Thiếu ID sản phẩm!"]);
    exit();
}

$product_id = intval($data["id"]);

$check_query = "SELECT id FROM products WHERE id = :id";
$stmt = $conn->prepare($check_query);
$stmt->execute(["id" => $product_id]);

if ($stmt->rowCount() === 0) {
    echo json_encode(["status" => "error", "message" => "Sản phẩm không tồn tại!"]);
    exit();
}

$conn->prepare("DELETE FROM order_items WHERE product_id = :id")->execute(["id" => $product_id]);
$conn->prepare("DELETE FROM cart WHERE product_id = :id")->execute(["id" => $product_id]);

$delete_query = "DELETE FROM products WHERE id = :id";
$stmt = $conn->prepare($delete_query);

if ($stmt->execute(["id" => $product_id])) {
    echo json_encode(["status" => "success", "message" => "Xóa sản phẩm thành công!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Lỗi khi xóa sản phẩm!"]);
}
?>

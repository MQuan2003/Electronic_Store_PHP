<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "./db_connect.php";

// Kiểm tra kết nối
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Lỗi kết nối database!"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào
$required_fields = ["id", "name", "price", "stock", "category", "brand", "image"];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(["status" => "error", "message" => "Thiếu dữ liệu: $field"]);
        exit();
    }
}

$product_id = intval($data["id"]);
$name = trim($data["name"]);
$price = floatval($data["price"]);
$stock = intval($data["stock"]);
$discount = isset($data["discount"]) ? floatval($data["discount"]) : 0;
$category_id = intval($data["category"]);
$brand_id = intval($data["brand"]);
$image = trim($data["image"]);
$attributes = isset($data["attributes"]) ? json_encode($data["attributes"]) : "{}";

$query = "UPDATE products 
SET name = :name, 
    price = :price, 
    stock = :stock, 
    discount = :discount, 
    category_id = :category_id, 
    brand_id = :brand_id, 
    image_url = :image, 
    attributes = :attributes 
WHERE id = :id
";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute([
        ":name" => $name,
        ":price" => $price,
        ":stock" => $stock,
        ":discount" => $discount,
        ":category_id" => $category_id,
        ":brand_id" => $brand_id,
        ":image" => $image,
        ":attributes" => $attributes,
        ":id" => $product_id
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Cập nhật thành công!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Không có thay đổi nào!"]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Lỗi khi cập nhật!",
        "error" => $e->getMessage(),
        "query" => $query,
        "params" => [
            "name" => $name,
            "price" => $price,
            "stock" => $stock,
            "discount" => $discount,
            "category_id" => $category_id,
            "brand_id" => $brand_id,
            "image" => $image,
            "attributes" => $attributes,
            "id" => $product_id
        ]
    ]);
}

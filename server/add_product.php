<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "./db_connect.php"; 

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['name']) || empty($data['price']) || empty($data['stock']) ||
    empty($data['category']) || empty($data['brand']) || empty($data['image'])
) {
    echo json_encode(["status" => "error", "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    http_response_code(400);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT id FROM categories WHERE name = :category_name");
    $stmt->execute(["category_name" => $data["category"]]);
    $category = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$category) {
        echo json_encode(["status" => "error", "message" => "Danh mục không tồn tại!"]);
        http_response_code(400);
        exit();
    }
    $category_id = $category["id"];
    $stmt = $conn->prepare("SELECT id FROM brands WHERE name = :brand_name");
    $stmt->execute(["brand_name" => $data["brand"]]);
    $brand = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$brand) {
        echo json_encode(["status" => "error", "message" => "Thương hiệu không tồn tại!"]);
        http_response_code(400);
        exit();
    }
    $brand_id = $brand["id"];

    $stmt = $conn->prepare("
        INSERT INTO products (name, price,stock, attributes, discount, category_id, brand_id, image_url) 
        VALUES (:name, :price, :stock, :attributes, :discount, :category, :brand, :image)
    ");

    $stmt->execute([
        ":name" => $data['name'],
        ":price" => $data['price'],
        ":stock" => $data['stock'],
        ":attributes" => json_encode($data['attributes']), 
        ":discount" => $data['discount'] ?? 0,
        ":category" => $category_id, 
        ":brand" => $brand_id, 

        ":image" => $data['image']
    ]);

    echo json_encode(["status" => "success", "message" => "Thêm sản phẩm thành công!"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Lỗi khi thêm sản phẩm: " . $e->getMessage()]);
    http_response_code(500);
}

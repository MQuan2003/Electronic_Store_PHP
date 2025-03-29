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
    $stmt = $conn->prepare("SELECT id, name FROM brands ORDER BY name ASC");
    $stmt->execute();
    
    $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($brands ?: []); 
} catch (PDOException $e) {
    echo json_encode(["error" => "Lỗi truy vấn: " . $e->getMessage()]);
    http_response_code(500);
}
?>

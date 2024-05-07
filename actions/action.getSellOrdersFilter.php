<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

header('Content-Type: application/json');

$db = getDatabaseConnection();

$category = $_POST['category'] ?? '';
$condition = $_POST['condition'] ?? '';
$brand = $_POST['brand'] ?? '';
$size = $_POST['size'] ?? '';

$query = "SELECT * FROM items WHERE 1=1";
$params = [];

if (!empty($category)) {
    $query .= " AND category_id = :category_id";
    $params[':category_id'] = $category;
}

if (!empty($condition)) {
    $query .= " AND condition_id = :condition_id";
    $params[':condition_id'] = $condition;
}

if (!empty($brand)) {
    $query .= " AND brand_id = :brand_id";
    $params[':brand_id'] = $brand;
}

if (!empty($size)) {
    $query .= " AND size_id = :size_id";
    $params[':size_id'] = $size;
}

$stmt = $db->prepare($query);
$stmt->execute($params);

$sellOrders = $stmt->fetchAll();

foreach ($sellOrders as &$sellOrder) {
    $stmt = $db->prepare("SELECT image_url FROM item_images WHERE item_id = :item_id LIMIT 1;");
    $stmt->execute([':item_id' => $sellOrder['item_id']]);
    $sellOrder['images'] = $stmt->fetch()['image_url'];
}

echo json_encode($sellOrders);
?>

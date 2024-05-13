<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

header('Content-Type: application/json');

$db = getDatabaseConnection();

$name = $_POST['name'] ?? '';
$category = $_POST['category'] ?? '';
$condition = $_POST['condition'] ?? '';
$brand = $_POST['brand'] ?? '';
$size = $_POST['size'] ?? '';
$start = $_POST['start'] ?? '';

$query = "SELECT * FROM items WHERE 1=1";
$c = "SELECT Count(*) AS number FROM items WHERE 1=1";
$params = [];



if (!empty($name)) {
    $query .= " AND name LIKE :name";
    $c .= " AND name LIKE :name";
    $params[':name'] = '%' . $name . '%';
}


if (!empty($category)) {
    $query .= " AND category_id = :category_id";
    $c .= " AND category_id = :category_id";
    $params[':category_id'] = $category;
}

if (!empty($condition)) {
    $query .= " AND condition_id = :condition_id";
    $c .= " AND condition_id = :condition_id";
    $params[':condition_id'] = $condition;
}

if (!empty($brand)) {
    $query .= " AND brand_id = :brand_id";
    $c .= " AND brand_id = :brand_id";
    $params[':brand_id'] = $brand;
}

if (!empty($size)) {
    $query .= " AND size_id = :size_id";
    $c .= " AND size_id = :size_id";
    $params[':size_id'] = $size;
}

$count = $db->prepare($c);
$count->execute($params);


$query.= ' ORDER BY item_id LIMIT 10 OFFSET (9 * :start)';
$params[':start'] = $start;

$stmt = $db->prepare($query);
$stmt->execute($params);

$sellOrders = $stmt->fetchAll();

foreach ($sellOrders as &$sellOrder) {
    $stmt = $db->prepare("SELECT image_url FROM item_images WHERE item_id = :item_id LIMIT 1;");
    $stmt->execute([':item_id' => $sellOrder['item_id']]);
    $sellOrder['images'] = $stmt->fetch()['image_url'];
}

$sellOrders['n'] = $count->fetch()['number'];

echo json_encode($sellOrders);
?>

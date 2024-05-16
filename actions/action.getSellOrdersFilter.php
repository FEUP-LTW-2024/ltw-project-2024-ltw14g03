<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

header('Content-Type: application/json');

$db = getDatabaseConnection();
$session = new Session();

$name = $_GET['name'] ?? '';
$category = $_GET['category'] ?? '';
$condition = $_GET['condition'] ?? '';
$brand = $_GET['brand'] ?? '';
$size = $_GET['size'] ?? '';
$start = $_GET['start'] ?? '0';

$query = "SELECT * FROM items WHERE 1=1";
$params = [];

if (!empty($name)) {
    $query .= " AND name LIKE :name";
    $params[':name'] = "%$name%";
}

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

$query .= ' ORDER BY item_id LIMIT 10 OFFSET :start';
$params[':start'] = (int) $start * 10;

$stmt = $db->prepare($query);
$stmt->execute($params);

$sellOrders = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($sellOrders as &$sellOrder) {

    $stmt = $db->prepare("SELECT image_url FROM item_images WHERE item_id = :item_id LIMIT 1;");
    $stmt->execute([':item_id' => $sellOrder['item_id']]);
    $sellOrder['images'] = $stmt->fetch()['image_url'] ?? 'no-image.png'; // Default image if none

    $stmt = $db->prepare("SELECT * FROM wishlist WHERE item_id = ? LIMIT 1");
    $stmt->execute([$sellOrder['item_id']]);
    $wish = $stmt->fetch();


    $stmt = $db->prepare("SELECT name FROM conditions WHERE condition_id = ? LIMIT 1");
    $stmt->execute([$sellOrder['condition_id']]);
    $sellOrder['condition'] = $stmt->fetch();

    $stmt = $db->prepare("SELECT name FROM sizes WHERE size_id = ? LIMIT 1");
    $stmt->execute([$sellOrder['size_id']]);
    $sellOrder['size'] = $stmt->fetch();

    $stmt = $db->prepare("SELECT name FROM brands WHERE brand_id = ? LIMIT 1");
    $stmt->execute([$sellOrder['brand_id']]);
    $sellOrder['brand'] = $stmt->fetch();

    $stmt = $db->prepare("SELECT name FROM categories WHERE category_id = ? LIMIT 1");
    $stmt->execute([$sellOrder['category_id']]);
    $sellOrder['category'] = $stmt->fetch();


    if(empty($wish)){
        $sellOrder['wish'] = "0";
    }
    else
    {
        $sellOrder['wish'] = "1";
    }

    if($session->getParam('id') == $sellOrder['seller_id']){
        $sellOrder['wish'] = "-1";
    }
}

echo json_encode($sellOrders);
?>

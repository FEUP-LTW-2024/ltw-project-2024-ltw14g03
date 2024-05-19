<?php

declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');


$db = getDatabaseConnection();
$session = new Session();
$user_id = $session->getParam('id');

$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body, true);

$sellOrderID = $request_data['itemID'] ?? null;

if ($sellOrderID === null) {
    http_response_code(400);
    echo json_encode(['error' => 'ID not provided']);
    exit();
}


$stmt = $db->prepare("SELECT * FROM items WHERE item_id = ?");
$stmt->execute([$sellOrderID]);
$sellOrder = $stmt->fetch();

$stmt = $db->prepare("SELECT * FROM item_images WHERE item_id = ?");
$stmt->execute([$sellOrderID]);
$sellOrder['images'] = $stmt->fetchAll();

$stmt = $db->prepare("SELECT * FROM categories WHERE category_id = ?");
$stmt->execute([$sellOrder['category_id']]);
$sellOrder['category'] = $stmt->fetch();

$stmt = $db->prepare("SELECT * FROM brands WHERE brand_id = ?");
$stmt->execute([$sellOrder['brand_id']]);
$sellOrder['brand'] = $stmt->fetch();

$stmt = $db->prepare("SELECT * FROM conditions WHERE condition_id = ?");
$stmt->execute([$sellOrder['condition_id']]);
$sellOrder['condition'] = $stmt->fetch();

$stmt = $db->prepare("SELECT * FROM sizes WHERE size_id = ?");
$stmt->execute([$sellOrder['size_id']]);
$sellOrder['size'] = $stmt->fetch();


$stmt = $db->prepare("SELECT * FROM users WHERE user_id = ?");
$stmt->execute([$sellOrder['seller_id']]);
$sellOrder['seller'] = $stmt->fetch();

if ($sellOrder === false) {
    http_response_code(404);
    echo json_encode(['error' => 'Sell order not found']);
    exit();
}

echo json_encode(['success' => true, 'sellOrder' => $sellOrder]);
?>


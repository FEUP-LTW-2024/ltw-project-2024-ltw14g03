<?php

declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');


$db = getDatabaseConnection();
$session = new Session();
$user_id = $session->getParam('id');

$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body, true); // Decode JSON data as associative array

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


$stmt = $db->prepare("SELECT * FROM wishlist WHERE item_id = ? AND user_id = ?");
$stmt->execute([$sellOrderID, $user_id]);
$sellOrder['inWishlist'] = $stmt->fetch() !== false;

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


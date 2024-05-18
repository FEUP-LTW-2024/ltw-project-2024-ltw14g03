<?php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');

header('Content-Type: application/json');
$session = new Session();
if (!$session->isLoggedIn()) {
    http_response_code(403);
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

$db = getDatabaseConnection();

$stmt = $db->prepare("SELECT * FROM shopping_cart WHERE user_id = ?");
$result = $stmt->execute([$session->getParam('id')]);

foreach($result as $row) {

    $stmt = $db->prepare("INSERT INTO transactions (buyer_id, item_id) Values (?, ?)");
    $result = $stmt->execute([$session->getParam('id'), $row['item_id']]);
}


$stmt = $db->prepare("DELETE FROM shopping_cart WHERE user_id = ?");
$result = $stmt->execute([$session->getParam('id')]);

if ($result) {
    echo json_encode(['success' => 'Cart cleared successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to clear the cart']);
}

echo 'lol';
?>
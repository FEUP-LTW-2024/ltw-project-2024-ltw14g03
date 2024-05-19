<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

header('Content-Type: application/json');

$session = new Session();
if (!$session->isLoggedIn()) {
    http_response_code(403);
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if (!isset($data['item_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Item ID not provided']);
    exit();
}

$db = getDatabaseConnection();

try {
    $stmt = $db->prepare("INSERT INTO wishlist (user_id, item_id) VALUES (?, ?)");
    $stmt->execute([$session->getParam('id'), $data['item_id']]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add item to wishlist', 'message' => $e->getMessage()]);
}

?>

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

$itemId = (int)$data['item_id'];
$userId = $session->getParam('id');

try {
    $db = getDatabaseConnection();
    $stmt = $db->prepare('DELETE FROM shopping_cart WHERE user_id = ? AND item_id = ?');
    $stmt->execute([$userId, $itemId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Item not found in shopping cart']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to remove item from shopping cart', 'message' => $e->getMessage()]);
}
?>

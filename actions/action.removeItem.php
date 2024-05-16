<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();

if (!$session->isLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$itemId = $data['item_id'] ?? null;

if (!$itemId) {
    echo json_encode(['success' => false, 'message' => 'Invalid item ID']);
    exit();
}

$db = getDatabaseConnection();
$stmt = $db->prepare('DELETE FROM items WHERE item_id = ? AND seller_id = ?');
$stmt->execute([$itemId, $session->getParam('id')]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Item not found or you are not the seller']);
}
?>

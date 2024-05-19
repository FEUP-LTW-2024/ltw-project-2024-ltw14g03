<?php

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');

$session = new Session();
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$db = getDatabaseConnection();

try {
    $stmt = $db->prepare("UPDATE items SET status = 'sold' WHERE item_id = ?");
    $stmt->execute([$data['item_id']]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to finish sale', 'message' => $e->getMessage()]);
}
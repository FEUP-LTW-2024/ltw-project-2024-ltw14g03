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

// Read the raw input
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json, true);

$db = getDatabaseConnection();

$stmt = $db->prepare("DELETE FROM wishlist WHERE user_id = ? AND item_id = ?");
$stmt->execute([$session->getParam('id'), $data['ID']]);

echo 'lol';
?>

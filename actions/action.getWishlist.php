<?php
declare(strict_types=1);
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();
$db = getDatabaseConnection();

header('Content-Type: application/json');

if (!$session->isLoggedIn()) {
    http_response_code(400);
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

$userId = $session->getParam('id');

try {
    $stmt = $db->prepare('SELECT item_id FROM wishlist WHERE user_id = ?');
    $stmt->execute([$userId]);
    $wishlistItems = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    $response = [
        'data' => $wishlistItems
    ];

    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch wishlist items']);
}
?>

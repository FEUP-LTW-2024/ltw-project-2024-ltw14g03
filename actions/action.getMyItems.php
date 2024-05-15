<?php

declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$db = getDatabaseConnection();
$session = new Session();

$userId = $session->getParam('id');
if ($userId === null) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID not provided']);
    exit();
}

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$perPage = 10;
$offset = ($page - 1) * $perPage;

$stmt = $db->prepare("SELECT * FROM items WHERE seller_id = ? LIMIT ?, ?");
$stmt->execute([$userId, $offset, $perPage]);

$items = $stmt->fetchAll();
if($items === false) {
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while fetching items']);
    exit();
}

foreach ($items as &$item) {
    $stmt = $db->prepare("SELECT image_url FROM item_images WHERE item_id = :item_id LIMIT 1;");
    $stmt->execute([':item_id' => $item['item_id']]);
    $item['images'] = $stmt->fetch()['image_url'] ?? 'no-image.png';
    
    $stmt = $db->prepare("SELECT * FROM wishlist WHERE item_id = :item_id AND user_id = :user_id LIMIT 1");
    $stmt->execute([':item_id' => $item['item_id'], ':user_id' => $userId]);
    $wish = $stmt->fetch();
    $item['wish'] = $wish ? true : false;
    
}

$response = [
    'success' => true,
    'items' => $items
];

echo json_encode($response);
?>

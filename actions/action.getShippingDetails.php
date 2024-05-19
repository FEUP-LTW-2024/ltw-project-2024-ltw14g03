<?php
declare(strict_types=1);
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();
$db = getDatabaseConnection();

header('Content-Type: application/json');

if (!$session->isLoggedIn()) {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$itemId = $data['item_id'] ?? null;

if ($itemId === null) {
    echo json_encode(['success' => false, 'error' => 'Invalid item ID']);
    exit();
}

try {
    $stmt = $db->prepare('SELECT * FROM transactions WHERE item_id = ?');
    $stmt->execute([$itemId]);
    $transaction = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $db->prepare('SELECT * FROM items WHERE item_id = ?');
    $stmt->execute([$itemId]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $db->prepare('SELECT * FROM users WHERE user_id = ?');
    $stmt->execute([$transaction['buyer_id']]);
    $buyer = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $db->prepare('SELECT * FROM categories WHERE category_id = ?');
    $stmt->execute([$item['category_id']]);
    $category = $stmt->fetch(PDO::FETCH_ASSOC);
    $item['category'] = $category;

    $stmt = $db->prepare('SELECT * FROM brands WHERE brand_id = ?');
    $stmt->execute([$item['brand_id']]);
    $brand = $stmt->fetch(PDO::FETCH_ASSOC);
    $item['brand'] = $brand;

    $stmt = $db->prepare('SELECT * FROM sizes WHERE size_id = ?');
    $stmt->execute([$item['size_id']]);
    $size = $stmt->fetch(PDO::FETCH_ASSOC);
    $item['size'] = $size;

    $stmt = $db->prepare('SELECT * FROM conditions WHERE condition_id = ?');
    $stmt->execute([$item['condition_id']]);
    $condition = $stmt->fetch(PDO::FETCH_ASSOC);
    $item['condition'] = $condition;





    if (!$item) {
        echo json_encode(['success' => false, 'error' => 'Item not found']);
        exit();
    }


    if (!$buyer) {
        echo json_encode(['success' => false, 'error' => 'Buyer not found']);
        exit();
    }
    $details = [
        'item' => $item,
        'buyer' => $buyer
    ];

    echo json_encode(['success' => true, 'details' => $details]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Failed to fetch details', 'message' => $e->getMessage()]);
}
?>

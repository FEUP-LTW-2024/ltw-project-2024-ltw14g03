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
    // Retrieve item IDs from the shopping cart for the current user
    $stmt = $db->prepare('SELECT item_id FROM shopping_cart WHERE user_id = ?');
    $stmt->execute([$userId]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    // Fetch details of items in the shopping cart
    $stmt = $db->prepare('SELECT * FROM items WHERE item_id IN (' . implode(',', array_fill(0, count($cartItems), '?')) . ')');
    $stmt->execute($cartItems);
    $cartItems = $stmt->fetchAll();

    foreach ($cartItems as &$item) {
        $stmt = $db->prepare('SELECT image_url FROM item_images WHERE item_id = ? LIMIT 1');
        $stmt->execute([$item['item_id']]);
        $item['image'] = $stmt->fetchColumn();

        
        $stmt = $db->prepare('SELECT * FROM conditions WHERE condition_id = ? LIMIT 1');
        $stmt->execute([$item['condition_id']]);
        $item['condition'] = $stmt->fetchColumn();

        $stmt = $db->prepare('SELECT * FROM brands WHERE brand_id = ? LIMIT 1');
        $stmt->execute([$item['brand_id']]);
        $item['brand'] = $stmt->fetchColumn();

        $stmt = $db->prepare('SELECT * FROM sizes WHERE size_id = ? LIMIT 1');
        $stmt->execute([$item['size_id']]);
        $item['size'] = $stmt->fetchColumn();

        $stmt = $db->prepare('SELECT * FROM categories WHERE category_id = ? LIMIT 1');
        $stmt->execute([$item['category_id']]);
        $item['category'] = $stmt->fetchColumn();



        $stmt = $db->prepare('SELECT * FROM wishlist WHERE item_id = ? AND user_id = ? LIMIT 1');
        $stmt->execute([$item['item_id'], $session->getParam('id')]);
        $wish = $stmt->fetch();

        $stmt = $db->prepare('SELECT * FROM shopping_cart WHERE item_id = ? AND user_id = ? LIMIT 1');
        $stmt->execute([$item['item_id'], $session->getParam('id')]);
        $cartItem = $stmt->fetch();

        if ($session->isLoggedIn()) {
            if (empty($wish)) {
                $item['wish'] = "false";
            } else {
                $item['wish'] = "true";
            }

            if ($session->getParam('id') == $item['seller_id']) {
                $item['wish'] = "owner";
            }
        } else {
            $item['wish'] = "notLoggedIn";
        }

        if ($session->isLoggedIn()) {
            if (empty($cartItem)) {
                $item['cart'] = "false";
            } else {
                $item['cart'] = "true";
            }

            if ($session->getParam('id') == $item['seller_id']) {
                $item['cart'] = "owner";
            }
        } else {
            $item['cart'] = "notLoggedIn";
        }
    }

    echo json_encode(['success' => true, 'cartItems' => $cartItems]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch cart items']);
}
?>

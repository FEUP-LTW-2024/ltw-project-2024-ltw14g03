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

    $stmt = $db->prepare('SELECT * FROM items WHERE item_id IN (' . implode(',', array_fill(0, count($wishlistItems), '?')) . ')');
    $stmt->execute($wishlistItems);
    $wishlistItems = $stmt->fetchAll();

    

    foreach ($wishlistItems as &$item) {
        $stmt = $db->prepare('SELECT image_url FROM item_images WHERE item_id = ? LIMIT 1');
        $stmt->execute([$item['item_id']]);
        $item['image'] = $stmt->fetchColumn();

        $stmt = $db->prepare("SELECT * FROM wishlist WHERE item_id = ? AND user_id = ? LIMIT 1");
        $stmt->execute([$item['item_id'], $session->getParam('id')]);
        $wish = $stmt->fetch();


        $stmt = $db->prepare("SELECT * FROM shopping_cart WHERE item_id = ? AND user_id = ? LIMIT 1");
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
    
    
        if($session->isLoggedIn()){
        if (empty($cartItem)) {
            $item['cart'] = "false";
        } else {
            $item['cart'] = "true";
        }
    
        if($session->getParam('id') == $item['seller_id']){
            $item['cart'] = "owner";
        }
        }else{
            $item['cart'] = "notLoggedIn";
        }
    }


    echo json_encode(['success' => true, 'wishlistItems' => $wishlistItems]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch wishlist items']);
}
?>

<?php
// action.getSellOrders.php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

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

    $stmt = $db->prepare("SELECT * from wishlist Where user_id = ? LIMIT 10 OFFSET (9 * ?)");
    $stmt->execute([$session->getParam('id'), $data['start']]);

    $wishes = $stmt->fetchAll();

    foreach ($wishes as &$wish){

        $stmt = $db->prepare("SELECT * from items Where item_id = ?");
        $stmt->execute([$wish['item_id']]);

        $post = $stmt->fetch();

        // Append each key-value pair from $post to $wish
        foreach ($post as $key => $value) {
            if(!isset($wish[$key])) {

                $wish[$key] = $value;
            }
        }

        $stmt = $db->prepare("SELECT image_url FROM item_images WHERE item_id = ? LIMIT 1");
        $stmt->execute([$wish['item_id']]);
        $wish['image'] = $stmt->fetch()['image_url'] ?? 'no-image.png';;

        $stmt = $db->prepare("SELECT name FROM conditions WHERE condition_id = ? LIMIT 1");
        $stmt->execute([$wish['condition_id']]);
        $wish['condition'] = $stmt->fetch();

        $stmt = $db->prepare("SELECT name FROM sizes WHERE size_id = ? LIMIT 1");
        $stmt->execute([$wish['size_id']]);
        $wish['size'] = $stmt->fetch();

        $stmt = $db->prepare("SELECT name FROM brands WHERE brand_id = ? LIMIT 1");
        $stmt->execute([$wish['brand_id']]);
        $wish['brand'] = $stmt->fetch();

        $stmt = $db->prepare("SELECT name FROM categories WHERE category_id = ? LIMIT 1");
        $stmt->execute([$wish['category_id']]);
        $wish['category'] = $stmt->fetch();

        $stmt = $db->prepare("SELECT * FROM wishlist WHERE item_id = ? LIMIT 1");
        $stmt->execute([$wish['item_id']]);
        $w = $stmt->fetch();

        $stmt = $db->prepare("SELECT * FROM shopping_cart WHERE item_id = ? LIMIT 1");
        $stmt->execute([$wish['item_id']]);
        $cartItem = $stmt->fetch();

        if(empty($w)){
            $wish['wish'] = "0";
        }
        else
        {
            $wish['wish'] = "1";
        }

        if (empty($cartItem)) {
            $wish['cart'] = "0";
        }
        else
        {
            $wish['cart'] = "1";
        }

        if($session->getParam('id') == $wish['seller_id']){
            $wish['wish'] = "-1";
        }
    }

echo json_encode($wishes);
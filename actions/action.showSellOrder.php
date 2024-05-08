<?php
// action.getSellOrders.php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

$db = getDatabaseConnection();
$session = new Session();

// Read the raw input
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json, true);

    $itemID = $data['ID'];

    //Get Post Info

        $query = $db->prepare('SELECT * FROM items WHERE item_id = ?');
        $query->execute([$itemID]);

        $sellOrders = $query->fetch();

        $query = $db->prepare('SELECT * FROM item_images WHERE item_id = ?');
        $query->execute([$itemID]);

        $sellOrders['image_src'] = $query->fetch()['image_url'];

        $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
        $query->execute([$sellOrders['seller_id']]);

        $user = $query->fetch();

        $sellOrders['seller_pfp'] = $user['profile_picture'];
        $sellOrders['seller_name'] = $user['username'];

        echo json_encode($sellOrders);


?>

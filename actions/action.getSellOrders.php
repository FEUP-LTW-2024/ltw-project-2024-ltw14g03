<?php
// action.getSellOrders.php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

header('Content-Type: application/json');

// Read the raw input
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json, true);


try {
    $db = getDatabaseConnection();

    $user = SellOrder::getSellOrders($db, $data['start']);

    $image = SellOrder::getSellOrderImages($db);

    foreach ($user as &$us) {

        $stmt = $db->prepare("SELECT image_url FROM item_images WHERE item_id = ? LIMIT 1");
        $stmt->execute([$us['item_id']]);
        $us['image'] = $stmt->fetch()['image_url'];

        $stmt = $db->prepare("SELECT * FROM wishlist WHERE item_id = ? LIMIT 1");
        $stmt->execute([$us['item_id']]);
        $wish = $stmt->fetch();

        if(empty($wish)){
            $us['wish'] = "0";
        }
        else
        {
            $us['wish'] = "1";
        }

    }




    echo json_encode($user);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
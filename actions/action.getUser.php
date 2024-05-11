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

    $userID = $data['ID'];

    //Get Post Info
        $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
        $query->execute([$userID]);

        $user = $query->fetch();

        echo json_encode($user);


?>

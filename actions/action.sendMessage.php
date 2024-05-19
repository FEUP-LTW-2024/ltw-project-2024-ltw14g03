<?php

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

$db = getDatabaseConnection();
$session = new Session();

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($session -> isLoggedIn()) {

    $receiver_id = (int)$data['receiver_id'];
    $message = trim($data['mess']);
    $sender_id = (int)$session->getParam("id");

    if (empty($message)) {
        echo "Message cannot be empty";
        exit;
    }

    $item_id = 1;

    $stmt = $db->prepare('INSERT INTO messages (sender_id, receiver_id, item_id, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([$sender_id, $receiver_id, $item_id, $message]);

}

?>

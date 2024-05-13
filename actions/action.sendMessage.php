<?php

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

$db = getDatabaseConnection();
$session = new Session();

// Read the raw input
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json, true);

if ($session -> isLoggedIn()) {

    $receiver_id = (int)$data['receiver_id'];
    $message = trim($data['mess']);
    $sender_id = (int)$session->getParam("id"); // Get sender's ID from session

    if (empty($message)) {
        echo "Message cannot be empty";
        exit;
    }


    // Define a default item ID or modify this based on your application's logic
    $item_id = 1; // Change this value if needed

    // Insert message into the database
    $stmt = $db->prepare('INSERT INTO messages (sender_id, receiver_id, item_id, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([$sender_id, $receiver_id, $item_id, $message]);

}

?>

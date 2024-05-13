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


    $sender_id = (int)$data['sender_id'];
    $receiver_id = (int)$data['receiver_id'];

    // Query the database to fetch messages between the sender and receiver
    $stmt = $db->prepare("SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp");
    $stmt->execute([$sender_id, $receiver_id, $receiver_id, $sender_id]);

    // Return messages in JSON format
    echo json_encode($stmt->fetchAll());

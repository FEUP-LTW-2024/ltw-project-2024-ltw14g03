<?php

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

$db = getDatabaseConnection();
$session = new Session();

$json = file_get_contents('php://input');

$data = json_decode($json, true);


    $sender_id = (int)$data['sender_id'];
    $receiver_id = (int)$data['receiver_id'];

    $stmt = $db->prepare("SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp");
    $stmt->execute([$sender_id, $receiver_id, $receiver_id, $sender_id]);

    echo json_encode($stmt->fetchAll());

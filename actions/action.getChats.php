<?php
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

$userID = $data['sender_id'];
$other = $data['receiver_id'];

    // Get distinct receiver IDs from messages where sender_id matches $userID
    $query = $db->prepare('SELECT DISTINCT receiver_id AS id FROM messages WHERE sender_id = ?');
    $query->execute([$userID]);
    $chats = $query->fetchAll();

    $users = [];

    // Fetch user information for each chat
    foreach ($chats as $id) {

        $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
        $query->execute([$id['id']]);

        $users[] = $query->fetch();

    }

    // Encode the result array to JSON and echo it
    echo json_encode($users);
?>


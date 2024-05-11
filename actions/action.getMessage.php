<?php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_SESSION['user_id'])) {
    $sender_id = (int)$_GET['sender_id'];
    $receiver_id = (int)$_GET['receiver_id'];

    // Query the database to fetch messages between the sender and receiver
    $stmt = $conn->prepare("SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp");
    $stmt->bind_param("iiii", $sender_id, $receiver_id, $receiver_id, $sender_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $messages = array();
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    $stmt->close();

    // Return messages in JSON format
    echo json_encode($messages);
}

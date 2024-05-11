<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['user_id'])) {
    $receiver_id = (int)$_POST['receiver_id'];
    $message = trim($_POST['message']);
    $sender_id = $_SESSION['user_id'];

    if (empty($message)) {
        echo "Message cannot be empty";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $sender_id, $receiver_id, $message);
    if ($stmt->execute()) {
        echo "Message sent successfully";
    } else {
        echo "Error sending message";
    }
    $stmt->close();
}
$conn->close();
?>

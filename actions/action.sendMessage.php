<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['user_id'])) {
    $receiver_id = (int)$_POST['receiver_id'];
    $message = trim($_POST['message']);
    $sender_id = (int)$_SESSION['user_id']; // Get sender's ID from session

    if (empty($message)) {
        echo "Message cannot be empty";
        exit;
    }

    // Define a default item ID or modify this based on your application's logic
    $item_id = 0; // Change this value if needed

    // Debugging output
    echo "Sender ID: $sender_id, Receiver ID: $receiver_id, Message: $message";

    // Insert message into the database
    $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, item_id, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $sender_id, $receiver_id, $item_id, $message);
    
    if ($stmt->execute()) {
        echo "Message sent successfully";
    } else {
        echo "Error sending message: " . $stmt->error; // Add this line for error handling
    }

    $stmt->close();
}

$conn->close();
?>

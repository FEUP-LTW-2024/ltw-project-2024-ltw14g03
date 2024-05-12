<?php 

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
require_once(__DIR__ . '/../database/connection.db.php');
$session = new Session();

if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$receiverId = isset($_GET['receiver_id']) ? (int)$_GET['receiver_id'] : 0; // Ensure this is sanitized properly

drawHeader($session);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chat</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="../scripts/chat.js"></script>

    <script>
        // Declare global variables for the JS file
        window.receiverId = <?php echo json_encode($receiverId); ?>;
        window.userId = <?php echo json_encode($session->getParam('id')); ?>; // Use the 'id' key to retrieve the user ID from the session
    </script>
</head>
<body>
    <div id="chat-container">
        <div id="receiver-id-info">Receiver ID (so para testes): <?php echo $receiverId; ?></div>
        <div id="receiver-id-info">Sender ID (so para testes): <?php echo $session->getParam('id'); ?></div> <!-- Corrected to use $session->getParam('id') -->

        <div id = "chat-box">

        </div>

        <textarea id="message-input" placeholder="Type your message here..."></textarea>
        <button onclick="sendMessage()">Send</button>
    </div>
</body>

<?php
drawFooter();
?>
</html>

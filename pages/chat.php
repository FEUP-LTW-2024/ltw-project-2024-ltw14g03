<?php 

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
require_once(__DIR__ . '/../database/connection.db.php');
$session = new Session();

if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$receiverId = isset($_GET['receiver_id']) ? (int)$_GET['receiver_id'] : 0;

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
        if(!window.receiverId)window.receiverId = <?php echo json_encode($receiverId); ?>;
        if(!window.userId)window.userId = <?php echo json_encode($session->getParam('id')); ?>;
    </script>
</head>

    <div style = "display: flex">

        <div class = "available-chats" id="chats">

        </div>

        <div id="chat-container">

            <div id = "chat-box">

            </div>

            <textarea id="message-input" placeholder="Type your message here..."></textarea>
            <button onclick="sendMessage()">Send</button>

        </div>
    </div>
</body>

<?php
drawFooter();
?>
</html>

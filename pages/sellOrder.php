<?php 
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();

$sellOrderDetails = $session->getSellOrder();
$otherUser = $session->getOtherUser();

drawHeader($session);
?>

<script src="../scripts/editProfile.js"></script>

<body>

    <div class = "sell-order-show">
        <h2 id="username"><?php echo $sellOrderDetails['name']; ?></h2>
        <img src = "<?php echo $sellOrderDetails['image_src']; ?>">
        <img src = "<?php echo $otherUser['profile_picture']; ?>">
        <h3 id = "description"><?php echo $sellOrderDetails['description']; ?></h3>
    </div>
</body>

<?php
drawFooter();

function debugToConsole($msg) { 
    echo "<script>console.log(".json_encode($msg).")</script>";
}

?>

</html>

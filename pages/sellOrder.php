<?php 
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();


drawHeader($session);
?>

<script src="../scripts/showSellOrderPost.js"></script>

<body>

    <div class = "sell-order-show" id = "sell-order-show">
    </div>
</body>

<?php
drawFooter();

function debugToConsole($msg) { 
    echo "<script>console.log(".json_encode($msg).")</script>";
}

?>

</html>

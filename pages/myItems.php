<?php 
declare(strict_types = 1);
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();

if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$db = getDatabaseConnection();
$stmt = $db->prepare('SELECT COUNT(*) AS number FROM items WHERE seller_id = ?');
$stmt->execute([$session->getParam('id')]);
$totalItems = $stmt->fetch(PDO::FETCH_ASSOC)['number'];
$itemsPerPage = 10;
$totalPages = ceil($totalItems / $itemsPerPage);

drawHeader($session);
?>

<body>

<script>
    window.onload = function() {
        fetchItems(0);
    }
</script>

<div class="featured-items">
        <div class="title-and-select">
            <h2>My Items</h2>
            <div class = "pageSelect">
                <?php for ($i = 0; $i < $totalPages; $i++): ?>
                    <li><h2><a href = "#" onclick = "fetchItems(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>
                <?php endfor; ?>
            </div>
        </div>
            <div class = "product-list" id = "myItems">
            </div>
</div>
    

</body>

<?php
drawFooter();
?>

</html>
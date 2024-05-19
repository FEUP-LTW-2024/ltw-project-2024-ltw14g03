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
$totalPages = ceil(($totalItems - 1) / $itemsPerPage);

drawHeader($session);
?>

<script src="../scripts/myItems.js"></script>
<script src="../scripts/myItemsProcessing.js"></script>   
<script src="../scripts/myItemsSold.js"></script>
<script src="../scripts/itemClickHandler.js"></script>

<body>

<script>
    window.onload = function() {
        fetchItems(0);
        fetchItemsProcessing(0);
        fetchItemsSold(0);
    }
</script>

<div class="featured-items">
<div class="title-and-select">
            <h2>Processing Items</h2>

            <div class = "pageSelect">
                <list>

                    <?php for($i = 0; $i < $totalPages; $i++): ?>

                        <li><h2><a href = "#" onclick = "fetchItemsProcessing(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>

                    <?php endfor; ?>
                </list>
            </div>

        </div>
            <div class = "product-list" id = "myItemsProcessing">
            </div>

        <div class="title-and-select">
            <h2>My Items</h2>

            <div class = "pageSelect">
                <list>

                    <?php for($i = 0; $i < $totalPages; $i++): ?>

                        <li><h2><a href = "#" onclick = "fetchItems(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>

                    <?php endfor; ?>
                </list>
            </div>

        </div>
            <div class = "product-list" id = "myItems">
            </div>

            <div class="title-and-select">
            <h2>Sold Items</h2>

            <div class = "pageSelect">
                <list>

                    <?php for($i = 0; $i < $totalPages; $i++): ?>

                        <li><h2><a href = "#" onclick = "fetchItemsSold(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>

                    <?php endfor; ?>
                </list>
            </div>

        </div>
            <div class = "product-list" id = "myItemsSold">
            </div>
</div>

</body>

<?php
drawFooter();
?>

</html>
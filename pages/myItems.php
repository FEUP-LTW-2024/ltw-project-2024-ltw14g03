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
$itemsPerPage = 10;

$stmt = $db->prepare('SELECT COUNT(*) AS number FROM items WHERE seller_id = ? And status = "listed"');
$stmt->execute([$session->getParam('id')]);
$totalItems = $stmt->fetch(PDO::FETCH_ASSOC)['number'];
$totalPages = ceil(($totalItems) / $itemsPerPage);

$stmt = $db->prepare('SELECT COUNT(*) AS number FROM items WHERE seller_id = ? And status = "sold"');
$stmt->execute([$session->getParam('id')]);
$totalItems = $stmt->fetch(PDO::FETCH_ASSOC)['number'];
$totalSolds = ceil(($totalItems) / $itemsPerPage);

$stmt = $db->prepare('SELECT COUNT(*) AS number FROM items WHERE seller_id = ? And status = "sold_processing"');
$stmt->execute([$session->getParam('id')]);
$totalItems = $stmt->fetch(PDO::FETCH_ASSOC)['number'];
$totalPSolds = ceil(($totalItems) / $itemsPerPage);

drawHeader($session);
?>

<script src="../scripts/myItems.js"></script>
<script src="../scripts/myItemsProcessing.js"></script>   
<script src="../scripts/myItemsSold.js"></script>
<script src="../scripts/itemClickHandler.js"></script>

<body>

<script>
    window.onload = async function () {
        await fetchItemsProcessing(0);
        await fetchItems(0);
        await fetchItemsSold(0);
    }
</script>

<div class="featured-items">

        <?php if($totalPSolds > 0): ?>
            <div class="title-and-select">
                <h2>Processing Items</h2>

                <div class = "pageSelect">
                    <list>

                        <?php for($i = 0; $i < $totalPSolds; $i++): ?>

                            <li><h2><a href = "#" onclick = "fetchItemsProcessing(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>

                        <?php endfor; ?>
                    </list>
                </div>

            </div>
            <div class = "product-list" id = "myItemsProcessing">

            </div>

        <?php endif; ?>

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

        <?php if($totalSolds > 0): ?>
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
        <?php endif; ?>
</div>

<div id="shippingFormContainer" style="display:none;">
    <div id="shippingFormContent"></div>
</div>


</body>

<?php
drawFooter();
?>

</html>
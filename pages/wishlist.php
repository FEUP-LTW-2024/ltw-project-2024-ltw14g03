<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../templates/common.tpl.php');
require_once(__DIR__ . '/../database/connection.db.php');
$session = new Session();

$db = getDatabaseConnection();

$stmt = $db->prepare('SELECT COUNT(*) AS number FROM wishlist WHERE user_id = ?');
$stmt->execute([$session->getParam('id')]);
$n = $stmt->fetch(PDO::FETCH_ASSOC)['number'];


drawHeader($session);
?>

<script src="../scripts/showWishlist.js"></script>
<script src="../scripts/itemClickHandler.js"></script>

<main id="mainPage">


    <section class="featured-items">

        <div class = "featured-header">
            <h1>Wishlist</h1>

            <div class = "pageSelect">
                <list>

                    <?php for($i = 0; $i < ($n)/10; $i++): ?>

                        <li><h2><a href = "#" onclick = "changePage(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>

                    <?php endfor; ?>
                </list>
            </div>
        </div>



        <div class="featured-items">


            <div class = "product-list" id = "productList">
            </div>

        </div>

    </section>
</main>

<?php
drawFooter();
?>
</body>
</html>

<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    require_once(__DIR__ . '/../database/connection.db.php');
    $session = new Session();

    $db = getDatabaseConnection();

    // Prepare SQL statement
    $stmt = $db->prepare('SELECT COUNT(*) AS number FROM items WHERE seller_id != :user_id AND status = "listed"');

    // Execute the statement
    $stmt->execute();

    // Access the row count
    $n = $stmt->fetch(PDO::FETCH_ASSOC)['number'];


    drawHeader($session); 
?>

<script src="../scripts/showSellOrders.js"></script>
<script src="../scripts/showCategoryItems.js"></script>
<script src="../scripts/itemClickHandler.js"></script>


<main id="mainPage">
    <section class="featured-items">
        
        <h1>Categories </h1>
        <div id ="featured-buttons">
            <?php
            $stmt = $db->query("SELECT * FROM categories");
            $categories = $stmt->fetchAll();
            foreach ($categories as $category) {
                echo "<button class='category-button' data-category-id='" . $category['category_id'] ."'>" . htmlspecialchars($category['name']) . "</button>";
            }
            ?>
        </div>

        <div class="featured-header">

            <h1>Featured Items</h1>

            <h1 class="center-header">Categories</h1>

            <div class = "pageSelect">
                <list>

                    <?php for($i = 0; $i < max((($n - 1)/10),1); $i++): ?>

                        <li><h2><a href = "#" onclick = "changePage(<?php echo $i?>)"><?php echo $i + 1?></a></h2></li>

                    <?php endfor; ?>
                </list>
            </div>

        </div>

        <div class="featured-items"></div>

            <div class = "product-list" id = "productList">
            </div>
        </div>
    </section>
</main>
</body>

<?php
    drawFooter();
?>
</html>

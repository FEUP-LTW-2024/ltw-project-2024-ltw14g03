<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    require_once(__DIR__ . '/../database/connection.db.php');
    $session = new Session();
    $db = getDatabaseConnection();

    drawHeader($session); 
?>

<main id="mainPage">
    <section class="featured-items">
        <div class="featured-header">
            <h2>Featured Items</h2>
        </div>
        <div class="featured-items" id="featured-buttons">
            <?php
                $stmt = $db->query("SELECT * FROM categories");
                $categories = $stmt->fetchAll();
                foreach ($categories as $category) {
                    echo "<button class='category-button' data-category-id='" . $category['category_id'] ."'>" . htmlspecialchars($category['name']) . "</button>";
                }
            ?>
        </div>
    </section>
</main>
</body>


<?php
    drawFooter();
?>
</html>

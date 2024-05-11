<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();


    drawHeader($session); 
?>

<script src="../scripts/showSellOrders.js"></script>


    <main id="mainPage">


        <section class="featured-items">

            <div class = "featured-header">
                <h2>Featured Items</h2>
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

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

            <div class = "pageSelect">
                <list>
                    <li><h3><a href = "#" onclick = "changePage(0)">1</a></h3></li>
                    <li><h3><a href = "#" onclick = "changePage(1)">2</a></h3></li>
                    <li><h3><a href = "#" onclick = "changePage(2)">3</a></h3></li>
                </list>
            </div>

        </section>
    </main>

<?php
    drawFooter();
?>
</body>
</html>

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
                <h1>Featured Items</h1>

                <div class = "pageSelect">
                    <list>
                        <li><h2><a href = "#" onclick = "changePage(0)">1</a></h2></li>
                        <li><h2><a href = "#" onclick = "changePage(1)">2</a></h2></li>
                        <li><h2><a href = "#" onclick = "changePage(2)">3</a></h2></li>
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

<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>
    <main id="mainPage">
        <section class="featured-items">
            <h2>Featured Items</h2>
            <br>

            <div class = "product-list" id = "productList">

                <div class="item" id = "items">
                    <img src="https://via.placeholder.com/150" alt="Item Image">
                    <h3>Item Name</h3>
                    <p>Description of the item.</p>
                </div>

            </div>

            <!-- Repeat the above div block for more items -->
        </section>

        <section class="about">
            <h2>Looking somewhere to but or sell pre-loved items?</h2>
            <p>We are here for you</p>
        </section>
    </main>
<?php
    drawFooter();
?>
</body>
</html>

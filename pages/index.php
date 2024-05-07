<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>
    <main id="mainPage">


        <section class="featured-items">

            <div class = "featured-header">
                <h2>Featured Items</h2>

                <div class = "featured-browse-input">
                    <label for="browse">Browse:</label>
                    <input type = "text" id = "browse">
                </div>
            </div>


            <div class = "product-list" id = "productList">
            </div>

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

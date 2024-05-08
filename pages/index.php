<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>
    <main id="mainPage">
<<<<<<< HEAD


        <section class="featured-items">

            <div class = "featured-header">
                <h2>Featured Items</h2>
            </div>

=======
>>>>>>> 6685161391eab98c87d8cafd4a5da4230e1b152a

        <section>

            <div class = "mainHeader">

                <h2>Current Items</h2>

                <div>
                    <label for="browse">Browse:</label>
                    <input type = "text" id = "browseInput">
                </div>
            </div>

            <div class="featured-items">


                <div class = "product-list" id = "productList">
                </div>

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

<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>

<body id="itemPage">
    <main>

        <div class = "ProductList">
            <div class="Item">
                <img class="mainImage" src="https://via.placeholder.com/150"\>
                <h2>Product Name</h2>
                <p>Product Description</p>
                <p>Price: $0.00</p>
            </div>
        </div>
    </main>

<?php
    drawFooter();
?>
</body>
</html>

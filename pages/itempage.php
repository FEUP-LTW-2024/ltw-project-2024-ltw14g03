<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');

    drawHeader(); 
?>
<body id="itemPage">
    <main>
        <div class="Product">
            <img class="mainImage" src="https://via.placeholder.com/150"\>
            <h2>Product Name</h2>
            <p>Product Description</p>
            <p>Price: $0.00</p>
        </div>

        <div class="Seller">
            <h2>Seller</h2>
            <p>Username</p>
            <button>Contact Seller</button>
        </div>
    </main>
<?php
    drawFooter();
?>
</body>
</html>

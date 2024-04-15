<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/templates/common.tpl.php');

    drawHeader(); 
?>
    <main>
        <section class="featured-items">
            <h2>Featured Items</h2>
            <div class="item">
                <img src="https://via.placeholder.com/150" alt="Item Image">
                <h3>Item Name</h3>
                <p>Description of the item.</p>
            </div>
            <!-- Repeat the above div block for more items -->
        </section>
    </main>
<?php
    drawFooter();
?>
</body>
</html>

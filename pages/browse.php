<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>
<body>
    <main>
        <section class = "search-items">

            <form action = "" method="get" id="searchForm">
                <input type="text" name="search_query" placeholder="Search items..." required>

            </form>

            <div class = "filtered-items" id = "itemsFilter">
                    <div class="item" id = "items">
                        <img src="https://via.placeholder.com/150" alt="Item Image">
                        <h3>Item Name</h3>
                        <p>Description of the item.</p>
                    </div>

            </div>

        </section>
    </main>
</body>
<?php
    drawFooter();
?>
</body>
</html>
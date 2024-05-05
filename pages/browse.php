<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>
<body>
    <main>
        <section class="search-items">
            <form action="search.php" method="get">
                <input type="text" name="search_query" placeholder="Search items..." required>
                <button type="submit">Search</button>
            </form>
            <!-- Repeat the above div block for more items -->
        </section>
    </main>
</body>
<?php
    drawFooter();
?>
</body>
</html>
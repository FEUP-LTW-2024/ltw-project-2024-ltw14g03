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
        </section>
    </main>
</body>
<?php
    drawFooter();
?>
</body>
</html>
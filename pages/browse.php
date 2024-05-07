<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();
    
    drawHeader($session); 
?>
<body>
    <main>
        <div class="browse">
            <div class="sidesearch">
                <h2>Search</h2>
                <form action="/action.getSellOrdersFilter.php" method="get">
                    <label for="category">Category:</label>
                    <select id="category" name="category">
                        <option value="">Select...</option>
                        <!-- Add your categories here -->
                    </select>

                    <label for="brand">Brand:</label>
                    <input type="text" id="brand" name="brand">

                    <label for="size">Size:</label>
                    <input type="text" id="size" name="size">

                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name">

                    <input type="submit" value="Search">
                </form>
            </div>
            <div class="searchResult">
            </div>
    </div>
    </main>
</body>
</body>
<?php
    drawFooter();
?>
</body>
</html>
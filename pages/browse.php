<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    require_once(__DIR__ . '/../database/connection.db.php');
    require_once(__DIR__ . '/../utils/session.php');
    $session = new Session();
    $db = getDatabaseConnection();

    $stmt = $db->prepare('SELECT COUNT(*) AS number FROM items');

    $stmt->execute();

    $n = $stmt->fetch(PDO::FETCH_ASSOC)['number'];
    
    drawHeader($session); 
?>


<body>
    <main>
        <div class="browse">

            <div class="sidesearch">
                <h2>Search</h2>
                <form id="searchForm" action="/action.getSellOrdersFilter.php" method="post">

                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name">

        
                    <label for="category">Category:</label>
                    <select id="category" name="category">
                        <option value="" selected> Any </option>
                        <?php
                            $stmt = $db->query("SELECT * FROM categories");
                            $categories = $stmt->fetchAll();
                                foreach ($categories as $category) {
                                    echo "<option value='{$category['category_id']}'>{$category['name']}</option>";
                                }
                        ?>
                    </select>

                    <label for="condition">Condition:</label>
                    <select id="condition" name="condition">
                            <option value="" selected>Any</option>
                        <?php
                            $stmt = $db->query("SELECT * FROM conditions");
                            $conditions = $stmt->fetchAll();
                            foreach ($conditions as $condition) {
                                    echo "<option value='{$condition['condition_id']}'>{$condition['name']}</option>";
                                }
                        ?>
                    </select>

                    <label for="brand">Brand:</label>
                    <select id="brand" name="brand">
                        <option value="" selected>Any</option>
                        <?php
                            $stmt = $db->query("SELECT * FROM brands");
                            $brands = $stmt->fetchAll();
                            foreach ($brands as $brand) {
                                echo "<option value='{$brand['brand_id']}'>{$brand['name']}</option>";
                            }
                        ?>
                    </select>
                    
                    <label for="size">Size:</label>
                    <input type="text" id="size" name="size">


                </form>
            </div>

            <div class = "search-results">
                <div class = "pageSelect">
                    <list id = "pageSelect" style= "margin: 1em; margin-left: auto">

                        <?php for($i = 0; $i < $n/10; $i++): ?>
                        
                        <li><h2><a href = "#" onclick = "changePage(<?php echo ($i)?>)"><?php echo $i + 1?></a></h2></li>

                        <?php endfor; ?>
                    </list>
                </div>

                <div class="searchResult">
                </div>

            </div>
    </main>

    <?php
    drawFooter();
    ?>
</body>

</html>
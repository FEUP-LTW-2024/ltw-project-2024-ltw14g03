<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
require_once(__DIR__ . '/../database/connection.db.php');
$session = new Session();

// Check if the user is logged in
if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$userDetails = $session->getUserDetails();
$db = getDatabaseConnection();
drawHeader($session);
?>

<body>
    <div class = "sell-order-create">

        <form id="sellOrderForm" action="" method="post" enctype="multipart/form-data">

            <h1>Add Sell Order</h1>

            <div class = "sell-order-elements">

                <div class = "sell-order-item" id = "SellImage">
                    <img id = "imageSell" src = "https://via.placeholder.com/150">
                    <input type="file" id="imageInput" name="image[]" accept="image/*" multiple>

                </div>

                <div class = "sell-order-item" id = "Sellbody">
                    
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" required>


                    <label for="category">Category:</label>
                    <select name = "category" id = "category" required>
                        <option value = "">Select a Category</option>
                        <?php
                        $stmt = $db->query("SELECT * FROM categories");
                        $categories = $stmt->fetchAll();
                        foreach ($categories as $category) {
                            echo "<option value='{$category['id']}'>{$category['name']}</option>";
                        }
                        ?>
                    </select>

                    <label for="condition">Condition:</label>
                    <select name = "condition" id = "condition" required>
                        <option value = "">Select a Condition</option>
                        <?php
                        $stmt = $db->query("SELECT * FROM conditions");
                        $conditions = $stmt->fetchAll();
                        foreach ($conditions as $condition) {
                            echo "<option value='{$condition['id']}'>{$condition['name']}</option>";
                        }
                        ?>
                    </select>

                    <label for="size">Size:</label>
                    <select name = "size" id = "size" required>
                        <option value = "">Select a Size</option>
                        <?php
                        $stmt = $db->query("SELECT * FROM sizes");
                        $sizes = $stmt->fetchAll();
                        foreach ($sizes as $size) {
                            echo "<option value='{$size['id']}'>{$size['name']}</option>";
                        }
                        ?>
                    </select>

                    <label for="model">Model:</label>
                    <input type="text" name="model" id="model" required>

                    <label for="price">Price:</label>
                    <input type="text" name="price" id="price" required>

                    <label for="description">Description:</label>
                    <input type="text" name="description" id="description" required>

                    <button type = "submit" name = "register">Submit</button>
                </div>
            </div>
        </form>
    </div>

</body>

<?php
drawFooter();
?>

</html>
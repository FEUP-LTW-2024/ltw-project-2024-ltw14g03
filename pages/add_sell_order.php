<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
require_once(__DIR__ . '/../database/connection.db.php');
$session = new Session();
$session->generate_random_token();
if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$userDetails = $session->getUserDetails();
$db = getDatabaseConnection();
drawHeader($session);
?>

<script src="../scripts/addSellOrderWithImage.js"></script>
<script src="../scripts/sellOrder.js"></script>

<body>
    <div class = "sell-order-create">

        <form id="sellOrderForm" action="" method="post" enctype="multipart/form-data">

            <h1>Add Sell Order</h1>

            <div class = "sell-order-elements">

                <div class = "sell-order-item" id = "SellImage">
                    <img id = "imageSell" src = "https://via.placeholder.com/150">
                    <input type="file" id = "imageInput" name="image[]" accept="image/*" required>
                </div>

                <div class = "sell-order-item" id = "Sellbody">

                    <div class = "line">
                        <label for="name">Name:</label>
                        <textarea type="text" name="name" id="name" class = "lineInput" required></textarea>
                    </div>


                    <div class = "line">
                        <label for="category">Category:</label>
                        <select name = "category" id = "category" class = "lineInput" required>
                            <option value = "">Select a Category</option>
                            <?php
                            $stmt = $db->query("SELECT * FROM categories");
                            $categories = $stmt->fetchAll();
                            foreach ($categories as $category) {
                                echo "<option value='{$category['category_id']}'>{$category['name']}</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class = "line">
                        <label for="condition">Condition:</label>
                        <select name = "condition" id = "condition" class = "lineInput" required>
                            <option value = "">Select a Condition</option>
                            <?php
                            $stmt = $db->query("SELECT * FROM conditions");
                            $conditions = $stmt->fetchAll();
                            foreach ($conditions as $condition) {
                                echo "<option value='{$condition['condition_id']}'>{$condition['name']}</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class = "line">
                        <label for="size">Size:</label>
                        <select name = "size" id = "size" class = "lineInput" required>
                            <option value = "">Select a Size</option>
                            <?php
                            $stmt = $db->query("SELECT * FROM sizes");
                            $sizes = $stmt->fetchAll();
                            foreach ($sizes as $size) {
                                echo "<option value='{$size['size_id']}'>{$size['name']}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class = "line">
                        <label for="brand">Brand:</label>
                        <SELECT name = "brand" id = "brand" class = "lineInput" required>
                            <option value = "">Select a Brand</option>
                            <?php
                            $stmt = $db->query("SELECT * FROM brands");
                            $brands = $stmt->fetchAll();
                            foreach ($brands as $brand) {
                                echo "<option value='{$brand['brand_id']}'>{$brand['name']}</option>";
                            }
                            ?>
                        </SELECT>
                    </div>
                            

                    <div class = "line">
                        <label for="model">Model:</label>
                        <textarea type="text" name="model" id="model" class = "lineInput" required></textarea>
                    </div>

                    <div class = "line">
                        <label for="price">Price:</label>
                        <textarea type="text" name="price" id="price" class = "lineInput" required></textarea>
                    </div>

                    <div class = "line">
                        <label for="description">Description:</label>
                        <textarea style = "height: 3em" type="text" name="description" id="description" class = "lineInput" required></textarea>
                    </div>
                    <input type="hidden" name="csrf" value="<?=$session->getParam('crf_token')?>">
                    <button type = "submit" name = "register" style = "margin-top: 1em">Submit</button>
                </div>
            </div>
        </form>
    </div>

</body>

<?php
drawFooter();
?>

</html>
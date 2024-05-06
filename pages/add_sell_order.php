<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();

// Check if the user is logged in
if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$userDetails = $session->getUserDetails();

drawHeader($session);
?>

<body>
    <div class = "sell-order-create">

        <form id="sellOrderForm" action="" method="post" enctype="multipart/form-data">

            <h1>Add Sell Order</h1>

            <div class = "sell-order-elements">

                <div class = "sell-order-item" id = "SellImage">
                    <img id = "imageSell" src = "https://via.placeholder.com/150">
                    <input type="file" id="imageInput" name="image" accept="image/*">

                </div>

                <div class = "sell-order-item" id = "Sellbody">

                    <label for="category">Category:</label>
                    <select name = "category" id = "category" required>
                        <option value = "">Select a Category</option>
                        <option value = "1">Games</option>
                    </select>

                    <label for="condition">Condition:</label>
                    <input type="text" name="condition" id="condition" required>

                    <label for="model">Model:</label>
                    <input type="text" name="model" id="model" required>

                    <label for="size">Size:</label>
                    <input type="text" name="size" id="size" required>

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
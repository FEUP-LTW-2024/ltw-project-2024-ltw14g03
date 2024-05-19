<?php

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
require_once(__DIR__ . '/../database/connection.db.php');
$session = new Session();

if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

if (!$session->isAdmin()) {
    header('Location: ../pages/index.php');
    exit();
}

drawHeader($session);
?>

<script src="../scripts/adminPanel.js" type="module"></script>

<main class="admin-panel">
    <h1>Admin Panel</h1>

    <form method="post" action="" class="admin-form">
        <label for="userId">User ID:</label>
        <input type="text" id="userId" name="userId" class="text-input">
        <button type="submit" name="elevate" class="btn btn-green">Elevate to Admin</button>
    </form>

    <form method="post" action="" class="admin-form">
        <label for="categoryName">Category Name:</label>
        <input type="text" id="categoryName" name="categoryName" class="text-input">
        <button type="submit" name="addCategory" class="btn btn-green">Add Category</button>
        <button type="submit" name="removeCategory" class="btn btn-red">Remove Category</button>
    </form>

    <form method="post" action="" class="admin-form">
        <label for="brandName">Brand Name:</label>
        <input type="text" id="brandName" name="brandName" class="text-input">
        <button type="submit" name="addBrand" class="btn btn-green">Add Brand</button>
        <button type="submit" name="removeBrand" class="btn btn-red">Remove Brand</button>
    </form>

    <form method="post" action="" class="admin-form">
        <label for="conditionName">Condition Name:</label>
        <input type="text" id="conditionName" name="conditionName" class="text-input">
        <button type="submit" name="addCondition" class="btn btn-green">Add Condition</button>
        <button type="submit" name="removeCondition" class="btn btn-red">Remove Condition</button>
    </form>

    <form method="post" action="" class="admin-form">
        <label for="sizeName">Size Name:</label>
        <input type="text" id="sizeName" name="sizeName" class="text-input">
        <button type="submit" name="addSize" class="btn btn-green">Add Size</button>
        <button type="submit" name="removeSize" class="btn btn-red">Remove Size</button>
    </form>

</main>



<?php
drawFooter();
?>
</body>
</html>

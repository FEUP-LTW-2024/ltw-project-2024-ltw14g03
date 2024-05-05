<?php

declare(strict_types = 1);
  require_once(__DIR__ . '/../database/connection.db.php');
  require_once(__DIR__ . '/../database/sellOrder.class.php');
require_once(__DIR__ . '/../templates/common.tpl.php');

  $db = getDatabaseConnection();
$session = new Session();
  //Use register user from customer.class.php

    SellOrder::addSellOrder($db, $session, $_POST['category'], $_POST['condition'], $_POST['model'], $_POST['size'], $_POST['price'], $_POST['description']);
  header('Location: ../pages/profile.php');
  exit();
?>
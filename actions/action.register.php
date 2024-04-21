<?php

declare(strict_types = 1);
  require_once(__DIR__ . '/../database/connection.db.php');
  require_once(__DIR__ . '/../database/customer.class.php');

  $db = getDatabaseConnection();

  //Use register user from customer.class.php
  Customer::registerUser($db, $_POST['firstName'], $_POST['lastName'], $_POST['username'], $_POST['password'], $_POST['city'], $_POST['state'], $_POST['country'], $_POST['zip'], $_POST['phone'], $_POST['email']);


  header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
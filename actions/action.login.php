<?php

declare(strict_types = 1);
session_start();



  require_once(__DIR__ . '/../database/connection.db.php');
  require_once(__DIR__ . '/../database/customer.class.php');

  $db = getDatabaseConnection();

  $customer = Customer::getCustomerWithPassword($db, $_POST['username'], $_POST['password']);

  if ($customer) {
    $_SESSION['username']=$customer->username;
  }else{
  }

  header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
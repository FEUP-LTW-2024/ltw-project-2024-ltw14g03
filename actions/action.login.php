<?php

declare(strict_types = 1);

  require_once(__DIR__ . '/../utils/session.php');
  require_once(__DIR__ . '/../database/connection.db.php');
  require_once(__DIR__ . '/../database/customer.class.php');

  $session = new Session();

  $db = getDatabaseConnection();

  $customer = Customer::getCustomerWithPassword($db, $_POST['username'], $_POST['password']);

  if ($customer) {
    $session->setUsername($customer->username);
    header('Location: ../pages/index.php');
  }else{
    header('Location: ' . $_SERVER['HTTP_REFERER']);
  }


?>
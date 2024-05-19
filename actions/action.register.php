<?php

declare(strict_types = 1);
  require_once(__DIR__ . '/../database/connection.db.php');
  require_once(__DIR__ . '/../database/customer.class.php');

  $db = getDatabaseConnection();

  if ($_POST['csrf'] !== $session->getParam('crf_token')) {
    exit();
  }

  if (isset($_POST['password']) && Customer::checkPassword($_POST['password'])) {
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    Customer::registerUser($db, $_POST['firstName'], $_POST['lastName'], $_POST['username'], $password, $_POST['city'], $_POST['state'], $_POST['country'], $_POST['zip'], $_POST['phone'], $_POST['email'], $_POST['adress']);
  }
  else
  {
    exit();
  }

  header('Location: ../pages/profile.php');
  exit();
?>
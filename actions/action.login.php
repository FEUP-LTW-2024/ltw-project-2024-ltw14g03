<?php

declare(strict_types = 1);

  require_once(__DIR__ . '/../utils/session.php');
  require_once(__DIR__ . '/../database/connection.db.php');
  require_once(__DIR__ . '/../database/customer.class.php');

  $session = new Session();

  $db = getDatabaseConnection();

  $customer = Customer::getCustomerWithPassword($db, $_POST['username'], $_POST['password']);

  if($customer){
      $session->setParam("id", strval($customer->user_id));
      $session->setParam("username", $customer->username);
      $session->setParam("email", $customer->email);
      $session->setParam("firstName", $customer->firstName);
      $session->setParam("lastName", $customer->lastName);
      $session->setParam("pfp", $customer->pfp);
      $session->setParam("is_admin", strval($customer->isAdmin));
      if ($session->checkIfError()) {
        if($session->getError() == "Invalid username or password"){
          $session->clearError();
        }
      }
    header('Location: ../pages/index.php');
  }else{
    $session->setError("Invalid username or password");
    header('Location: ' . $_SERVER['HTTP_REFERER']);
  }


?>
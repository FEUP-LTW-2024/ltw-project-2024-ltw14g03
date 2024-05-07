<?php 
    declare(strict_types = 1);
    require_once(__DIR__ . '/../templates/common.tpl.php');
    $session = new Session();

    drawHeader($session); 
?>

  <body>
    <div class = "login-form">

        <h1>Sign In</h1>

        <form action="../actions/action.login.php" method="post">
          <label for="username">Username:</label>
          <input type="text" name="username" id="username" required>
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" required>
          <button type="submit" name="login">Login</button>
        </form>
        <?php if ($session->checkIfError()){
          if ($session->getError() == "Invalid username or password"){
            echo "<p style='color: red;'>Invalid username or password</p>";
          }
        } ?>
          
        <button id="registerButton" onclick="location.href='register.php'">Dont have an account? Click here</button>
    </div>
  </body>

  <?php
    drawFooter();
  ?>

</html>
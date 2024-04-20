<?php 
  declare(strict_types = 1); 
  session_start();
?>


<?php function drawHeader() { ?>
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>QuickFlip</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/style/style.css">
    <link rel="stylesheet" href="../assets/style/layout.css">
    <link rel="stylesheet" href="../assets/style/responsive.css">
  
  </head>
  <body>
  <header>
        <h1>QuickFlip</h1>
        <nav id="menu">
            <input type="checkbox" id="hamburger"> 
            <label class="hamburger" for="hamburger"></label>
            <ul>
                <li><a href="../pages/index.php">Home</a></li>
                <li><a href="#">Browse</a></li>
                <li><a href="#">Sell</a></li>
                <li><a href="#">Profile</a></li>
                <?php if(isset($_SESSION['username'])) { ?>
                  <li><a href="../pages/login.php">LOGGED IN</a></li>
                <?php } else { ?>
                  <li><a href="../pages/login.php">Sign In/Sign Up</a></li>
                <?php } ?>
              

            </ul>
        </nav>
    </header>
<?php } ?>


<?php function drawFooter() { ?>
    <footer>
        <p>© 2024 QuickFlip. All rights reserved.</p>
    </footer>
<?php } ?>
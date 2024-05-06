<?php 
  declare(strict_types = 1); 

  require_once(__DIR__ . '/../utils/session.php');
  
?>

<?php function drawHeader(Session $session) { ?>
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>QuickFlip</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/style/style.css">
    <link rel="stylesheet" href="../assets/style/layout.css">
    <link rel="stylesheet" href="../assets/style/responsive.css">
    <script src="../scripts/logout.js"></script>
    <script src="../scripts/validatePassword.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../scripts/editProfile.js"></script>
    <script src="../scripts/showSellOrders.js"></script>
  </head>
  <body>
  <header>
        <h1>QuickFlip</h1>
        <nav id="menu">
            <input type="checkbox" id="hamburger"> 
            <label class="hamburger" for="hamburger"></label>
            <ul>
                <li><a href="../pages/index.php">Home</a></li>
                <li><a href="../pages/browse.php">Browse</a></li>
                <li><a href="#">Sell</a></li>
                <?php if($session->isLoggedIn()) { ?>
                  <li class="dropdown"><img class="profileImageBar" src="<?php echo $session->getParam("pfp")?>"><a href=""><?php echo  $_SESSION['username']?></a>
                  <div class="dropdown-content">
                    <a href="../pages/profile.php">Profile</a>
                    <a href="#" onclick="logoutUser(); return false;">Logout</a>
                  </div>
                  </li>
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
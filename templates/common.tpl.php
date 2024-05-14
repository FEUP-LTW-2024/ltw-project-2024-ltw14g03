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
    <script src="../scripts/notification.js" ></script>

    <?php if($_SERVER['REQUEST_URI']== "/pages/register.php"){?>
      <script src="../scripts/validatePassword.js"></script>
    <?php } ?>

    <?php if($_SERVER['REQUEST_URI']== "/pages/add_sell_order.php"){?>
      <script src="../scripts/addSellOrderWithImage.js"></script>
    <?php } ?>

    <?php if($_SERVER['REQUEST_URI']== "/pages/profile.php"){?>
      <script src="../scripts/editProfile.js"></script>
    <?php } ?>

    <?php if($_SERVER['REQUEST_URI']== "/pages/index.php"){?>
      <script src="../scripts/showCategoryItems.js"></script>
    <?php } ?>
    <?php if($_SERVER['REQUEST_URI']=="/pages/browse.php"){?>
      <script src="../scripts/showSellOrdersFiltered.js"></script>
    <?php } ?>
    <?php if($_SERVER['REQUEST_URI']=="/pages/adminpage.php"){?>
      <script src="../scripts/adminPanel.js" type="module"></script>
    <?php } ?>
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
                <?php 
                if($session->isAdmin()){?>
                  <li><a href="../pages/adminpage.php">Admin Panel</a></li>
                <?php } 
              
                if($session->isLoggedIn()) { ?>
                  <li class="dropdown"><img class="profileImageBar" src="<?php echo $session->getParam("pfp")?>"><a href="" id="username-bar"><?php echo  $_SESSION['username']?></a>
                  <div class="dropdown-content">
                    <a href="../pages/profile.php">Profile</a>
                      <a href="../pages/add_sell_order.php">Sell</a>
                    <a href="#" onclick="logoutUser(); return false;">Logout</a>
                  </div>
                  </li>
                <?php } else { ?>
                  <li><a href="../pages/login.php">Sign In/Sign Up</a></li>
                <?php } ?>
            </ul>
        </nav>
    </header>
    <div id="notification-bar"></div>
<?php } ?>


<?php function drawFooter() { ?>
    <footer>
        <p>© 2024 QuickFlip. All rights reserved.</p>
    </footer>
  <?php } ?> 

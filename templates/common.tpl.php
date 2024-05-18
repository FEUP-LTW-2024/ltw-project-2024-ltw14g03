<?php 
  declare(strict_types = 1); 

    require_once(__DIR__ . '/../utils/session.php');
    require_once(__DIR__ . '/../database/connection.db.php');
  
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

      <script>
          window.userId = <?php echo json_encode($session->getParam('id')); ?>; // Use the 'id' key to retrieve the user ID from the session
      </script>

      
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
                <?php if($session->isLoggedIn()) {?>

                    <li><a href="../pages/wishlist.php">Wishlist</a></li>

                    <?php
                        $db = getDatabaseConnection();
                        $stmt = $db->prepare('SELECT COUNT(*) AS number FROM shopping_cart WHERE user_id = ?');

                        $stmt->execute([$session->getParam('id')]);

                        $n = $stmt->fetch(PDO::FETCH_ASSOC)['number'];

                        if($n > 0){
                    ?>

                        <li><a href="../pages/checkout.php">Checkout</a></li>

                    <?php
                            }
                        if($session->isAdmin()){?>
                        <li><a href="../pages/adminpage.php">Admin Panel</a></li>
                    <?php }?>

                  <li class="dropdown"><img class="profileImageBar" src="<?php echo $session->getParam("pfp")?>"><a href="" id="username-bar"><?php echo  $_SESSION['username']?></a>

                  <div class="dropdown-content">
                    <a href="../pages/profile.php">Profile</a>
                    <a href="../pages/myItems.php">My Items</a>
                      <a href="../pages/add_sell_order.php">Sell</a>
                      <a href="../pages/chat.php">Message</a>
                    <a href="#" onclick="logoutUser(); return false;">Logout</a>
                  </div>

                  </li>
                <?php } else { ?>
                  <li><a href="../pages/login.php">Sign In/Sign Up</a></li>
                <?php } ?>
            </ul>
        </nav>
        <div id="notification-bar"></div>
    </header>
<?php } ?>


<?php function drawFooter() { ?>
    <footer>
        <p>© 2024 QuickFlip. All rights reserved.</p>
    </footer>
  <?php } ?> 

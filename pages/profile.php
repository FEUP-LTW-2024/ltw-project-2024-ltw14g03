<?php 
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();

// Check if the user is logged in
if (!$session->isLoggedIn()) {
    header('Location: ../pages/login.php');
    exit();
}

$userDetails = $session->getUserDetails();

drawHeader($session);
?>

<body>
    <div class="profile-info">
        <h1>User Profile</h1>
        <div class="profile-details">
            <?php debugToConsole($userDetails['pfp']); ?>
            <img src="../<?php echo $userDetails['pfp'] ?>" alt="Profile Picture">

            <form action="uploadProfilePicture.php" method="post" enctype="multipart/form-data">
                <label for="profilePicture">Change Profile Picture:</label><br>
                <input type="file" id="profilePicture" name="profilePicture" accept="image/*"><br>
                <button type="submit">Upload Image</button>
            </form>

            <div class="profile-detail">
                <label for="username">Username:</label>
                <span id="username"><?php echo htmlspecialchars($userDetails['username']); ?></span>
            </div>

            <div class="profile-detail">
                <label for="email">Email:</label>
                <span id="email"><?php echo htmlspecialchars($userDetails['email']); ?></span>
            </div>

            <div class="profile-detail">
                <label for="fullName">Full Name:</label>
                <span id="fullName"><?php echo htmlspecialchars($userDetails['firstname'] . ' ' . $userDetails['lastname']); ?></span>
            </div>
        </div>
        <button class="profile-button" id="editProfileBtn">Edit Profile</button>

    </div>
</body>

<?php
drawFooter();

function debugToConsole($msg) { 
    echo "<script>console.log(".json_encode($msg).")</script>";
}

?>

</html>

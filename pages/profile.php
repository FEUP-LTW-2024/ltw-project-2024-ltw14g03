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

// Assume getUsername() returns the username from the session
$username = $session->getUsername();

//TODO:: nao sei fazer esta funcao a ir buscar à base de dados
$userDetails = $session->getUserDetails($username);

drawHeader($session);
?>

<body>
    <div class="profile-info">
        <h1>User Profile</h1>
        <div class="profile-details">
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
                <span id="fullName"><?php echo htmlspecialchars($userDetails['firstName'] . ' ' . $userDetails['lastName']); ?></span>
            </div>
        </div>
        <button class="profile-button" onclick="location.href='editProfile.php';">Edit Profile</button>

    </div>
</body>

<?php
drawFooter();
?>

</html>

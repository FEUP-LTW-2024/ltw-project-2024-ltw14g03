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

// Retrieve the seller_id from the query parameters
if (isset($_GET['seller_id'])) {
    $sellerId = (int)$_GET['seller_id'];
} else {
    // Redirect or display an error if the seller_id parameter is not provided
    // For simplicity, let's redirect back to the home page
    header('Location: ../index.php');
    exit();
}

// For testing purposes, let's assume some sample seller details
$sellerDetails = [
    'username' => 'SampleSeller',
    'email' => 'sample@example.com',
    'firstname' => 'John',
    'lastname' => 'Doe',
    'pfp' => 'path/to/sample/profile/picture.jpg'
];

drawHeader($session);
?>

<body>
    <div class="profile-info">
        <h1>Seller Profile</h1>

        <div class="profile-detail">
            <img src="../<?php echo $sellerDetails['pfp'] ?>" id="imageprofile" alt="Profile Picture">
        </div>

        <div class="profile-text">
            <div class="profile-detail">
                <h2 id="username"><?php echo htmlspecialchars($sellerDetails['username']); ?></h2>
            </div>

            <div class="profile-detail">
                <label for="email">Email:</label>
                <span id="email"><?php echo htmlspecialchars($sellerDetails['email']); ?></span>
            </div>

            <div class="profile-detail">
                <label for="fullName">Full Name:</label>
                <span id="fullName"><?php echo htmlspecialchars($sellerDetails['firstname'] . ' ' . $sellerDetails['lastname']); ?></span>
            </div>
            </div>
                <!-- Button to go to chat page -->
                <button class="profile-button" onclick="window.location.href='chat.php?receiver_id=<?php echo $sellerId; ?>'">Chat with Seller</button>

                </div>
        </div>

        <!-- You can add more profile details here as needed -->

    </div>
</body>

<?php
drawFooter();
?>
</html>
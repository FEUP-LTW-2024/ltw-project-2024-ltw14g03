<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();

drawHeader($session);
?>

<script src="../scripts/showSellerProfile.js"></script>

<body>

    <div class="profile-info" id = "profile_info">

    </div>
        </div>

        <!-- You can add more profile details here as needed -->

    </div>
</body>

<?php
drawFooter();
?>
</html>
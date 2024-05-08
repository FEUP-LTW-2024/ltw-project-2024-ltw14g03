<?php 
declare(strict_types = 1);
require_once(__DIR__ . '/../templates/common.tpl.php');
$session = new Session();
drawHeader($session);
?>

<body>
    <div class="login-form" id="registerForm">

        <h1>Register</h1>

        <form action="../actions/action.register.php" method="post">

            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required>

            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required>

            <label for="firstName">First Name:</label>
            <input type="text" name="firstName" id="firstName" required>

            <label for="lastName">Last Name:</label>
            <input type="text" name="lastName" id="lastName" required>

            <label for="city">City:</label>
            <input type="text" name="city" id="city" required>

            <label for="state">State:</label>
            <input type="text" name="state" id="state" required>

            <label for="country">Country:</label>
            <select name="country" id="country" required>
                <option value="">Select a country</option>
                <option value="POR">Portugal</option>
                <option value="USA">United States of America</option>
                <option value="CAN">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AUS">Australia</option>
                <option value="GER">Germany</option>
                <option value="FRA">France</option>
                <option value="ITA">Italy</option>
                <option value="SPA">Spain</option>
                <option value="JPN">Japan</option>
                <option value="CHN">China</option>
            </select>

            <label for="zip">ZIP Code:</label>
            <input type="text" name="zip" id="zip" required>

            <label for="phone">Phone Number:</label>
            <input type="text" name="phone" id="phone" required>

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>

            <?php if (isset($_GET['error']) && $_GET['error'] == 'password'): ?>
                <p style="color: red;">.</p>
            <?php endif; ?>

            <button type = "submit" name="register">Register</button>
        </form>
    </div>
</body>

<?php
drawFooter();
?>

</html>

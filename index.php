<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickFlip - Home</title>
    <link rel="stylesheet" href="assets/style/style.css">
    <link rel="stylesheet" href="assets/style/responsive.css">
</head>
<body>
    <header>

        <ul class = "log-options">
            <li><a>LogIn</a></li>
            <li><a>LogOut</a></li>
        </ul>

        <h1>QuickFlip</h1>
        <nav id="menu">
            <input type="checkbox" id="hamburger"> 
            <label class="hamburger" for="hamburger"></label>
            <ul>
                <li><a href = "../index.php" >Home</a></li>
                <li><a >Browse</a></li>
                <li><a >Sell</a></li6>
                <li><a href = "../profile.php" >Profile</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class = "featured-items">
            <h2>Featured Items</h2>
            <div class="item">
                <img src="https://via.placeholder.com/150" alt="Item Image">
                <h3>Item Name</h3>
                <p>Description of the item.</p>
            </div>
            <!-- Repeat the above div block for more items -->
        </section>
    </main>
    <footer>
        <p>© 2024 QuickFlip. All rights reserved.</p>
    </footer>
</body>
</html>

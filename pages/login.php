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
    <div class="login-form">
        <h1> QuickFlip </h1>
        <form action="../actions/login.php" method="post">
          <label for="username">Username:</label>
          <input type="text" name="username" id="username" required>
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" required>
          <button type="submit" name="login">Login</button>
        </form>

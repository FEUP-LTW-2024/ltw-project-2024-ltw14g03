<?php
  class Session
  {

    public function __construct()
    {
      session_start();
    }

    public function isLoggedIn(): bool
    {
      return isset($_SESSION['username']);
    }

    public function isAdmin(): bool
    {
      if ($_SESSION['is_admin']==false){
        return false;
      }else{
        return true;
      }
    }

    public function logout()
    {
      session_destroy();
    }

    public function setParam(string $param, string $username)
    {
      $_SESSION[$param] = $username;
    }

    public function getParam(string $param): ?string
    {
      return isset($_SESSION[$param]) ? $_SESSION[$param] : "";
    }

    public function getUserDetails(): array
    {

      $details['id'] = $this->getParam('id');

      $details['username'] = $this->getParam('username');
      $details['email'] = $this->getParam('email');
      $details['firstname'] = $this->getParam('firstName');
      $details['lastname'] = $this->getParam('lastName');
      $details['pfp'] = $this->getParam('pfp');

      return $details;
    }

    public function getSellOrder(): array
    {
      $details = json_decode($this->getParam('sellOrder'), true);

      return $details;
    }

    public function getOtherUser(): array
    {

      $details = json_decode($this->getParam('otherUser'), true);

      return $details;
    }


    public function setError(string $error)
    {
      $_SESSION['error'] = $error;
    }

    public function checkIfError(): bool
    {
      return isset($_SESSION['error']);
    }

    public function getError(): string
    {
      $error = $_SESSION['error'];
      unset($_SESSION['error']);
      return $error;
    }

    public function clearError()
    {
      unset($_SESSION['error']);
    }

    public function fetchOtherUser(PDO $db, int $sellerId)
    {
      $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
      $query->execute([$sellerId]);
      $otherUser = $query->fetch();
      $this->setParam("otherUser", json_encode($otherUser));
    }

    public function generate_random_token() {
      $this->setParam('crf_token',bin2hex(openssl_random_pseudo_bytes(32)));
    }
  }

?>

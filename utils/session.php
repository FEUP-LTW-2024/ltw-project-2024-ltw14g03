<?php
  class Session {

    public function __construct() {
      session_start();
    }

    public function isLoggedIn() : bool {
      return isset($_SESSION['username']);    
    }

    public function logout() {
      session_destroy();
    }

    public function setParam(string $param, string $username) {
      $_SESSION[$param] = $username;
    }

    public function getParam(string $param) : ?string {
      return isset($_SESSION[$param]) ? $_SESSION[$param] : "";
    }

    public function getUserDetails(): array
    {

        $details['username'] = $this->getParam('username');
        $details['email'] = $this->getParam('email');
        $details['firstname'] = $this->getParam('firstname');
        $details['lastname'] = $this->getParam('lastname');

        return $details;
    }
  }
?>
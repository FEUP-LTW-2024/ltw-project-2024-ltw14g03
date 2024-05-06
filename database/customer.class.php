<?php
declare(strict_types=1);

function debugToConsole($msg) { 
    echo "<script>console.log(".json_encode($msg).")</script>";
}


class Customer {
    public int $user_id;
    public string $firstName;
    public string $lastName;
    public string $username;
    public string $city;
    public string $state;
    public string $country;
    public string $zip;
    public string $phone;
    public string $email;

    public DateTime $dateJoined;
    public bool $isAdmin;

    public string $pfp;

    public function __construct(int $user_id, string $firstName, string $lastName, string $username, string $city, string $state, string $country, string $zip, string $phone, string $email, DateTime $dateJoined, bool $isAdmin, string $pfp) {

        $this->user_id = $user_id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->username = $username;
        $this->city = $city;
        $this->state = $state;
        $this->country = $country;
        $this->zip = $zip;
        $this->phone = $phone;
        $this->email = $email;
        $this->dateJoined = $dateJoined;
        $this->isAdmin = $isAdmin;
        $this->pfp = $pfp;
    }

    public function name(): string {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function save(PDO $db): void {
        $stmt = $db->prepare('
            UPDATE users SET firstName = ?, lastName = ?, username = ?, city = ?, state = ?, country = ?, zip = ?, phone = ?, email = ?, is_admin = ?
            WHERE user_id = ?
        ');

        $stmt->execute([
            $this->firstName, $this->lastName, $this->username, $this->city, $this->state, $this->country, $this->zip, $this->phone, $this->email, $this->isAdmin ? 1 : 0, $this->user_id
        ]);
    }

    static function getCustomerWithPassword(PDO $db, string $username, string $password): ?Customer {

        $stmt = $db->prepare('
            SELECT user_id, firstName, lastName, username, password, city, state, country, zip, phone, email, created_at, is_admin, profile_picture
            FROM users 
            WHERE lower(username) = ?
        ');

        $stmt->execute([strtolower($username)]);

        if ($customer = $stmt->fetch()) {

            if (!password_verify($password, $customer['password'])) {
                return null;
            }

            $dateJoined = new DateTime($customer['created_at']);
            return new Customer(
                (int)$customer['user_id'],
                $customer['firstName'],
                $customer['lastName'],
                $customer['username'],
                $customer['city'],
                $customer['state'],
                $customer['country'],
                $customer['zip'],
                $customer['phone'],
                $customer['email'],
                $dateJoined,
                (bool)$customer['is_admin'],
                $customer['profile_picture']
            );
        }
        else
        {
            return null;
        }
    }

    static function getCustomer(PDO $db, int $id): ?Customer {
        $stmt = $db->prepare('
            SELECT user_id, firstName, lastName, username, city, state, country, zip, phone, email, created_at, is_admin, profile_picture
            FROM users
            WHERE user_id = ?
        ');

        $stmt->execute([$id]);
        $customer = $stmt->fetch();
        if ($customer) {
            $dateJoined = new DateTime($customer['created_at']);
            return new Customer(
                (int)$customer['user_id'],
                $customer['firstName'],
                $customer['lastName'],
                $customer['username'],
                $customer['city'],
                $customer['state'],
                $customer['country'],
                $customer['zip'],
                $customer['phone'],
                $customer['email'],
                $dateJoined,
                (bool)$customer['is_admin'],
                $customer['profile_picture']
            );
        } else {
            return null;
        }
    }

    static function registerUser(PDO $db, string $firstName, string $lastName, string $username, string $password, string $city, string $state, string $country, string $zip, string $phone, string $email): void {
        $stmt = $db->prepare('
        SELECT * FROM users WHERE username = ? OR email = ?
        ');

        $stmt->execute([$username, $email]);

        if ($stmt->fetch()) {
            debugToConsole("User already exists");
        }else{

            $stmt = $db->prepare('
                INSERT INTO users (firstName, lastName, username, password, city, state, country, zip, phone, email, is_admin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ');

            $stmt->execute([$firstName, $lastName, $username, $password, $city, $state, $country, $zip, $phone, $email, 0]);
        }
    }

    static function checkPassword(string $password): int{
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/', $password);
    }

    public function updateFirstAndSecondName(PDO $db, string $firstName, string $lastName): void {
        // Username is this customer user_id
        $user_id = $this->user_id;
        $stmt = $db->prepare('
            UPDATE users SET firstName = ?, lastName = ?
            WHERE user_id = ?
        ');

        $stmt->execute([$firstName, $lastName, $user_id]);
    }
}

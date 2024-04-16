<?php
declare(strict_types=1);

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

    public function __construct(int $user_id, string $firstName, string $lastName, string $username, string $city, string $state, string $country, string $zip, string $phone, string $email, DateTime $dateJoined, bool $isAdmin) {
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

    static function getCustomerWithPassword(PDO $db, string $email, string $password): ?Customer {
        $stmt = $db->prepare('
            SELECT user_id, firstName, lastName, username, city, state, country, zip, phone, email, created_at, is_admin
            FROM users 
            WHERE lower(email) = ? AND password = ?
        ');

        $stmt->execute([strtolower($email), $password]);

        if ($customer = $stmt->fetch()) {
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
                (bool)$customer['is_admin']
            );
        } else {
            return null;
        }
    }

    static function getCustomer(PDO $db, int $id): ?Customer {
        $stmt = $db->prepare('
            SELECT user_id, firstName, lastName, username, city, state, country, zip, phone, email, created_at, is_admin
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
                (bool)$customer['is_admin']
            );
        } else {
            return null;
        }
    }
}

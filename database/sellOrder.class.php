<?php
declare(strict_types=1);

function debugToConsole($msg) { 
    echo "<script>console.log(".json_encode($msg).")</script>";
}


class SellOrder {
    static function addSellOrder(PDO $db, Session $session, string $category, string $condition, string $model, string $size, string $price, string $description): void {

            $stmt = $db->prepare('
                INSERT INTO items (seller_id, category_id, condition_id, model, size, price, description)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');

            $details = $session->getUserDetails();

            $stmt->execute([intval($details["id"]), intval($category), intval($condition), $model, $size, intval($price), $description]);
    }

    static function getSellOrders(PDO $db): array {


        $stmt = $db->prepare('
                SELECT * FROM items LIMIT 5;
            ');

        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    static function checkPassword(string $password): int{
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/', $password);
    }
}

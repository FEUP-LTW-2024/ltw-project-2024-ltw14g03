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

        $sellOrders = $stmt->fetchAll(\PDO::FETCH_ASSOC);


        foreach ($sellOrders as $key => $order) {
            $sellOrder = new SellOrder();
            $sellOrders[$key]['image'] = $sellOrder->getImage($db, (int) $order['item_id']);
        }

        return $sellOrders;
    }

    public function getSellOrdersFilter(PDO $db, string $name): array{
        $stmt = $db->prepare('
                SELECT * FROM items WHERE (instr(name, ?) != 0) LIMIT 5;
            ');

        $stmt->execute([$name]);

        $sellOrders = $stmt->fetchAll(\PDO::FETCH_ASSOC);


        foreach ($sellOrders as $key => $order) {
            $sellOrders[$key]['image'] = self::getImage($db, (int) $order['item_id']);
        }

        return $sellOrders;
    }

    public function getImage(PDO $db, int $id): string{
        $stmt = $db->prepare('
                SELECT image_url FROM item_images WHERE item_id = ? LIMIT 1;
            ');

        $stmt->execute([$id]);

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        if ($result === false) {
            return ""; // Return an empty string if no image is found
        }

        return $result["image_url"];
    }
}

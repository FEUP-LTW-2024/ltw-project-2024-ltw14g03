<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();
$db = getDatabaseConnection();

$input = json_decode(file_get_contents('php://input'), true);

$categoryId = $input['category'] ?? null;

if ($categoryId) {
    $stmt = $db->prepare("SELECT * FROM items WHERE category_id = ?");
    $stmt->execute([$categoryId]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
} else {
    echo json_encode([]);
}
?>

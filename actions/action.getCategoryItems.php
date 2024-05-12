<?php
declare(strict_types = 1);
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();
$db = getDatabaseConnection();

// Obtain input as JSON
$input = json_decode(file_get_contents('php://input'), true);

// Fetch category from the JSON request
$categoryId = $input['category'] ?? null; // Use null coalescing in case the category key is not set

if ($categoryId) {
    $stmt = $db->prepare("SELECT * FROM items WHERE category_id = ?");
    $stmt->execute([$categoryId]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
} else {
    // If category ID is not provided, return an error or empty result
    echo json_encode([]);
}
?>

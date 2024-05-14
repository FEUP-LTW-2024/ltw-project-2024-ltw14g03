<?php

declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');

$db = getDatabaseConnection();
$category = $_POST['categoryName'] ?? null;
if ($category === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Category name not provided']);
    exit();
}
$stmt = $db->prepare("DELETE FROM categories WHERE name = ?");
$stmt->execute([$category]);

echo json_encode(['success' => true]);
?>
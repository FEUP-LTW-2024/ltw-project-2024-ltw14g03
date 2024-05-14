<?php

declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');

$db = getDatabaseConnection();

$condition = $_POST['conditionName'] ?? null;
if ($condition === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Category name not provided']);
    exit();
}

$stmt = $db->prepare("DELETE FROM conditions WHERE name = ?");
$stmt->execute([$condition]);

echo json_encode(['success' => true]);
?>
<?php

declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');

$db = getDatabaseConnection();
$size = $_POST['sizeName'] ?? null;
if ($brand === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Size name not provided']);
    exit();
}
$stmt = $db->prepare("DELETE FROM sizes WHERE name = ?");
$stmt->execute([$brand]);

echo json_encode(['success' => true]);
?>
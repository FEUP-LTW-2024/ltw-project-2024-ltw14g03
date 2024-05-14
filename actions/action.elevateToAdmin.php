<?php
declare(strict_types=1);

require_once(__DIR__ . '/../database/connection.db.php');

$db = getDatabaseConnection();
$user = $_POST['userId'] ?? null;
if ($user === null) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID not provided']);
    exit();
}

$stmt = $db->prepare("UPDATE users SET is_admin = 1 WHERE user_id = ?");
$stmt->execute([$user]);

echo json_encode(['success' => true]);
?>

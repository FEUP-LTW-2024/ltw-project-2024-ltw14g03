<?php
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'logout') {
    $session->logout();
    echo json_encode(['success' => true]);
    exit;
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}
?>

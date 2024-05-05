<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/customer.class.php');

header('Content-Type: application/json');

$session = new Session();
if (!$session->isLoggedIn()) {
    http_response_code(403);
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

$db = getDatabaseConnection();
$details = $session->getUserDetails();
$id = (int) $details['id'];
$customer = Customer::getCustomer($db, $id);

try {
    $customer->updateFirstAndSecondName($db, $_POST['firstName'], $_POST['lastName']);
    $session->setParam('firstName', $_POST['firstName']);
    $session->setParam('lastName', $_POST['lastName']);
    echo json_encode(['success' => 'Profile updated successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

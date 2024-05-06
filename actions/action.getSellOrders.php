<?php

declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

header('Content-Type: application/json');

$db = getDatabaseConnection();

echo json_encode(SellOrder::getSellOrders($db));

?>

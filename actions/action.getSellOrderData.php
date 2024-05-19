<?php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

$db = getDatabaseConnection();
$session = new Session();

$encodedData = $_GET['data'];


$jsonData = json_decode(urldecode($encodedData), true);

echo json_encode($jsonData);


?>

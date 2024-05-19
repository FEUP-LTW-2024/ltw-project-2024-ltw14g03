<?php
declare(strict_types=1);

require_once(__DIR__ . '/../utils/session.php');
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../database/sellOrder.class.php');

function objectExistsInArray($obj, $array) {
    foreach ($array as $item) {
        if ($item === $obj) {
            return true;
        }
    }
    return false;
}

    $db = getDatabaseConnection();
    $session = new Session();

    $json = file_get_contents('php://input');

    $data = json_decode($json, true);

    $userID = $data['sender_id'];
    $other = $data['receiver_id'];

    $query = $db->prepare('SELECT DISTINCT receiver_id AS id FROM messages WHERE sender_id = ?');
    $query->execute([$userID]);
    $chats = $query->fetchAll();

    $users = [];

    foreach ($chats as $id) {

        $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
        $query->execute([$id['id']]);

        $users[] = $query->fetch();

    }

    $query = $db->prepare('SELECT DISTINCT sender_id AS id FROM messages WHERE receiver_id = ?');
    $query->execute([$userID]);
    $chats = $query->fetchAll();

    foreach ($chats as $id) {

        $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
        $query->execute([$id['id']]);

        $us = $query->fetch();

        if(!objectExistsInArray($us, $users)){
            $users[] = $us;
        }
    }

    $query = $db->prepare('SELECT * FROM users WHERE user_id = ?');
    $query->execute([$other]);

    $us = $query->fetch();

    if(!objectExistsInArray($us, $users)){
        $users[] = $us;
    }

    echo json_encode($users);
?>


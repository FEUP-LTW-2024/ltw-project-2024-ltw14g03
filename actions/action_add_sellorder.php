<?php
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

header('Content-Type: application/json');

$session = new Session();
$user = $session->getUserDetails();
$user_id = $user['id'];

$response = ['success' => false, 'uploaded' => []];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $db = getDatabaseConnection();
    $stmt = $db->prepare("INSERT INTO items (seller_id, category_id, condition_id, model, size, price, description) VALUES (:seller_id, :category_id, :condition_id, :model, :size, :price, :description)");
    if ($stmt->execute([
        'seller_id' => $user_id, 
        ':category_id' => $_POST['category'], 
        ':condition_id' => $_POST['condition'], 
        ':model' => $_POST['model'], 
        ':size' => $_POST['size'], 
        ':price' => $_POST['price'], 
        ':description' => $_POST['description']
    ])) {
        $item_id = $db->lastInsertId();
        $response['item_id'] = $item_id;

        // Handle file upload
        if (isset($_FILES['image']) && $_FILES['image']['error'][0] != 4) { // Check if image is uploaded and not empty
            $target_dir = "../assets/images/";
            foreach ($_FILES["image"]["name"] as $key => $value) {
                if ($_FILES['image']['error'][$key] == 0) {
                    $file_name = basename($_FILES["image"]["name"][$key]);
                    $target_file = $target_dir . $file_name;
                    if (move_uploaded_file($_FILES["image"]["tmp_name"][$key], $target_file)) {
                        $stmt = $db->prepare("INSERT INTO item_images (item_id, image_url) VALUES (:item_id, :image_url)");
                        if ($stmt->execute([':item_id' => $item_id, ':image_url' => $target_file])) {
                            $response['uploaded'][] = $target_file;
                            $response['success'] = true;
                        } else {
                            $response['error'] = 'Failed to insert image record into the database.';
                        }
                    } else {
                        $response['error'] = 'Failed to move uploaded file.';
                    }
                } else {
                    $response['error'] = 'No file uploaded or file upload error.';
                }
            }
        } else {
            $response['success'] = true;
        }

        echo json_encode($response);
    }
}
?>

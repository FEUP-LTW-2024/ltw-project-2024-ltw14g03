<?php
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

header('Content-Type: application/json');

$session = new Session();
$user = $session->getUserDetails();
$user_id = $user['id'];

if ($_POST['csrf'] !== $session->getParam('crf_token')) {
    echo "<cript>console.log('CSRF token mismatch')</script>";
    exit();
  }


$response = ['success' => false, 'uploaded' => []];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $db = getDatabaseConnection();
    $stmt = $db->prepare("INSERT INTO items (name, seller_id, category_id, condition_id, model, size_id, price, description, brand_id) VALUES (:name, :seller_id, :category_id, :condition_id, :model, :size_id, :price, :description, :brand)");
    if ($stmt->execute([
        'name' => htmlspecialchars($_POST['name']),
        'seller_id' => $user_id, 
        ':category_id' => htmlspecialchars($_POST['category']), 
        ':condition_id' => htmlspecialchars($_POST['condition']), 
        ':model' => htmlspecialchars($_POST['model']), 
        ':size_id' => htmlspecialchars($_POST['size']), 
        ':price' => htmlspecialchars($_POST['price']), 
        ':description' => htmlspecialchars($_POST['description']),
        ':brand' => htmlspecialchars($_POST['brand'])
    ])) {
        $item_id = $db->lastInsertId();
        $response['item_id'] = $item_id;

        if (isset($_FILES['image']) && $_FILES['image']['error'][0] != 4) { 
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

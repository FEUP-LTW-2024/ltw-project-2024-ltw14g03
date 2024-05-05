<?php
require_once(__DIR__ . '/../database/connection.db.php');


$target_dir = "../assets/images/";
$original_file_name = basename($_FILES["fileToUpload"]["name"]);
$imageFileType = strtolower(pathinfo($original_file_name, PATHINFO_EXTENSION));
$base_file_name = pathinfo($original_file_name, PATHINFO_FILENAME);
$target_file = $target_dir . $original_file_name;
$uploadOk = 1;
$file_counter = 1;


while (file_exists($target_file)) {
    $target_file = $target_dir . $base_file_name . "_" . $file_counter . '.' . $imageFileType;
    $file_counter++;
}

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

if ($_FILES["fileToUpload"]["size"] > 5000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

$item_id = $_POST['item_id'];

if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". htmlspecialchars( basename( $target_file)). " has been uploaded.";

        $db = getDatabaseConnection();
        $stmt = $db->prepare("INSERT INTO item_images (item_id, image_url) VALUES (:item_id, :image_url)");
        $stmt->execute([':item_id' => $item_id, ':image_url' => $target_file]);
        echo "Image record successfully created.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>

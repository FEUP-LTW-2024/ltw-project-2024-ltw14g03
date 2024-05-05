<?php
require_once(__DIR__ . '/../database/connection.db.php');
require_once(__DIR__ . '/../utils/session.php');

$session = new Session();

$target_dir = "../assets/images/";
$uploadOk = 1;

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["profilePicture"])) {
    $original_file_name = basename($_FILES["profilePicture"]["name"]);
    $imageFileType = strtolower(pathinfo($original_file_name, PATHINFO_EXTENSION));
    $base_file_name = pathinfo($original_file_name, PATHINFO_FILENAME);
    $target_file = $target_dir . $original_file_name;
    $file_counter = 1;

    while (file_exists($target_file)) {
        $target_file = $target_dir . $base_file_name . "_" . $file_counter . '.' . $imageFileType;
        $file_counter++;
    }

    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["profilePicture"]["tmp_name"]);
        if($check !== false) {
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // Check file size
    if ($_FILES["profilePicture"]["size"] > 5000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["profilePicture"]["tmp_name"], $target_file)) {
            echo "The file ". htmlspecialchars(basename($target_file)). " has been uploaded.";
            $db = getDatabaseConnection();
            $stmt = $db->prepare("UPDATE users SET profile_picture = :profile_picture WHERE user_id = :user_id");
            $user_id = $session->getParam("id");  // Ensure getParam method correctly retrieves the user's ID
            $stmt->bindParam(':profile_picture', $target_file);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            echo "Image record successfully updated.";
            $session->setParam("pfp", $target_file);  // Update session information if needed
            header('Location: ../pages/profile.php');
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
} else {
    echo "No file was uploaded or incorrect request method.";
}
?>

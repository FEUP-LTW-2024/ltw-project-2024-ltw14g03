document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sellOrderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('../actions/action_add_sellorder.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Item and image uploaded successfully!');
                console.log(data.item_id);
                window.location.href = "../pages/index.php"; // Redirect user to index page
            } else {
                alert('Failed to upload item and image.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred!');
        });
    });
});

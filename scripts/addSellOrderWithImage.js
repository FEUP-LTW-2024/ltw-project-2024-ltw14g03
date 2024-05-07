document.getElementById('sellOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(this);  // This will gather all form inputs, including the file

    fetch('../actions/action_add_sellorder.php', {  // Update with the correct path to your PHP script
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())  // Assuming the server responds with JSON
    .then(data => {
        if (data.success) {
            alert('Item and image uploaded successfully!');
            console.log(data.item_id);  // Handle or display the item ID as needed
        } else {
            alert('Failed to upload item and image.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred!');
    });
});

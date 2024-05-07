document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const form = document.getElementById('sellOrderForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            console.log("Form submission intercepted");
            event.preventDefault();  // This should prevent the form from submitting traditionally.

            const formData = new FormData(this);  // This collects the form data.
            console.log ("Form data collected", formData);
            fetch('../actions/action.add_sellorder.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log("Response received", data);
                if (data.success) {
                    alert('Item uploaded successfully!');
                } else {
                    alert('Failed to upload item and image.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred!');
            });
        });
    } else {
        console.error('Form element not found');
    }
});

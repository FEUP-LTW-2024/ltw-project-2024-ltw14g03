
document.addEventListener("DOMContentLoaded", function() {

    const main = document.getElementById("imageInput");
    main.addEventListener('change', function (event) {

        const [file] = main.files

        document.getElementById("imageSell").src = URL.createObjectURL(file);
    });
});

document.getElementById('sellOrderForm').addEventListener('submit', function (event) {

    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(this);  // This will gather all form inputs, including the file

    fetch('../actions/action.add_sellorder.php', {  // Update with the correct path to your PHP script
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())  // Assuming the server responds with JSON
        .catch(error => {
            console.error('Error:', error);
        });
});

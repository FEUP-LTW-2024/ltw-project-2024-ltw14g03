document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const form = document.getElementById('sellOrderForm');

    if (form) {
        form.addEventListener('submit', function(event) {

            console.log("Form submission intercepted");
            event.preventDefault();  // This should prevent the form from submitting traditionally.

            const formData = new FormData(form);  // This collects the form data.
            console.log ("Form data collected", formData);

            fetch('../actions/action.add_sellorder.php', {
                method: 'POST',
                body: formData,
            }).then(r => {window.location.href = '../pages/index.php';})

        });
    } else {
        console.error('Form element not found');
    }
});

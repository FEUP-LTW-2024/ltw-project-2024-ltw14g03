document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const form = document.getElementById('sellOrderForm');

    if (form) {
        form.addEventListener('submit', function(event) {

            console.log("Form submission intercepted");
            event.preventDefault();

            const formData = new FormData(form);
            console.log ("Form data collected", formData);

            fetch('../actions/action.add_sellorder.php', {
                method: 'POST',
                body: formData,
            }).then(r => {window.location.href = '../pages/index.php';})
            event.preventDefault();
            event.stopImmediatePropagation();

        });
    } else {
        console.error('Form element not found');
    }
});

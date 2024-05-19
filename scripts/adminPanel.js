import { displayNotification } from "./notification.js";


document.addEventListener("DOMContentLoaded", function() {
    const adminForms = document.querySelectorAll(".admin-form");

    adminForms.forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const formData = new FormData(this);
            let action = this.querySelector("button[type='submit']:focus").name;
            let actionPath = '';

            switch (action) {
                case 'elevate':
                    actionPath = '../actions/action.elevateToAdmin.php';
                    break;
                case 'addCategory':
                    actionPath = '../actions/action.addCategory.php';
                    break;
                case 'removeCategory':
                    actionPath = '../actions/action.removeCategory.php';
                    break;
                case 'addBrand':
                    actionPath = '../actions/action.addBrand.php';
                    break;
                case 'removeBrand':
                    actionPath = '../actions/action.removeBrand.php';
                    break;
                case 'addCondition':
                    actionPath = '../actions/action.addCondition.php';
                    break;
                case 'removeCondition':
                    actionPath = '../actions/action.removeCondition.php';
                    break;
                case 'addSize':
                    actionPath = '../actions/action.addSize.php';
                    break;
                case 'removeSize':
                    actionPath = '../actions/action.removeSize.php';
                    break;
            }

            fetch(actionPath, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayNotification("Sucessfully updated", true);
                } else {
                    alert('Error: ' + data.message);
                }

            })
            .catch(error => {
                console.error('Error:', error);
                alert('Operation failed');
            });
        });
    });
});

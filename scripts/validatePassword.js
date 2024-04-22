document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".login-form form");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    passwordInput.insertAdjacentElement('afterend', errorMessage);

    form.addEventListener("submit", function(event) {
        const password = passwordInput.value;
        if (!isValidPassword(password)) {
            event.preventDefault();
            errorMessage.textContent = "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
        }
    });

    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }
});


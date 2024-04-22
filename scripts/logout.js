function logoutUser() {
    fetch('../actions/action.logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=logout'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '../pages/index.php';
        } else {
            alert('Logout failed. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}
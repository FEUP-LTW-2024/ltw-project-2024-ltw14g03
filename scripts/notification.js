export function displayNotification(message, isSuccess) {
    console.log('Notification:', message);
    const notificationBar = document.getElementById('notification-bar');
    notificationBar.textContent = message;
    notificationBar.style.backgroundColor = isSuccess ? 'green' : 'red';
    notificationBar.style.background = isSuccess ? 'green' : 'red';
    console.log(notificationBar.classList);
    notificationBar.classList.add('visible');
    console.log(notificationBar.classList);

    setTimeout(() => {
        notificationBar.classList.remove('visible');
    }, 5000);
}

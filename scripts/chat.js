$(document).ready(function() {
    $('#message-input').keydown(function(event) {
        // Check for Enter key press, but not when Shift is also pressed
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();  // Prevent the default action (newline)
            sendMessage();           // Call sendMessage function
        }
    });
});

function fetchMessages() {
    $.ajax({
        url: 'getMessages.php',
        type: 'GET',
        data: {receiver_id: window.receiverId},
        success: function(data) {
            var messages = JSON.parse(data);
            $('#chat-box').html('');
            messages.forEach(function(message) {
                var messageClass = message.sender_id == window.userId ? 'sender' : 'receiver';
                $('#chat-box').append(`<div class="message ${messageClass}">${message.message}</div>`);
            });
            scrollToBottom();
        }
    });
}

function sendMessage() {
    var message = $('#message-input').val();
    if (message.trim() === '') {
        alert('Message cannot be empty!');
        return;
    }
    var messageClass = 'sender';
    $('#chat-box').append(`<div class="message ${messageClass}">${message}</div>`); // Display message instantly
    $('#message-input').val(''); // Clear input field right after sending
    scrollToBottom();

    $.ajax({
        url: 'sendMessage.php',
        type: 'POST',
        data: {
            message: message,
            receiver_id: window.receiverId
        },
        success: function(response) {
            // Optionally handle response
        }
    });
}

function scrollToBottom() {
    $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
}

setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds to update the chat

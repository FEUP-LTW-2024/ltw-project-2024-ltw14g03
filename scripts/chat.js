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

    const params = {
        sender_id: window.userId,
        receiver_id: window.receiverId
    };

    fetch('../actions/action.getMessage.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            response.json()
                .then( j => {
                    const main = document.getElementById("chat-box");
                    main.innerHTML = ``;
                    j.forEach(message => {

                        if(message.sender_id == window.userId) {
                            main.innerHTML += `
                                <div class = "sender">
                                    ${message.message}
                                </div>
                            `
                        }
                        else
                        {
                            main.innerHTML += `
                                <div class ="receiver">
                                    ${message.message}
                                </div>
                            `
                        }
                    });
                });
        })
}


function sendMessage() {
    var message = $('#message-input').val();

    if (message.trim() === '') {
        alert('Message cannot be empty!');
        return;
    }

    const params = {
        mess: message,
        receiver_id: window.receiverId
    };

    fetch("../actions/action.sendMessage.php", {
        method: 'POST',
        body: JSON.stringify(params),
    })

    var messageClass = 'sender';
    //$('#chat-box').append(`<div class="message ${messageClass}">${message}</div>`); // Display message instantly
    $('#message-input').val(''); // Clear input field right after sending
    scrollToBottom();
}

function scrollToBottom() {
    $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
}

setInterval(fetchMessages, 200); // Fetch messages every 5 seconds to update the chat

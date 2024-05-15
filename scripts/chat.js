$(document).ready(function() {
    $('#message-input').keydown(function(event) {
        // Check for Enter key press, but not when Shift is also pressed
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();  // Prevent the default action (newline)
            sendMessage();           // Call sendMessage function
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const chats = document.getElementById('chats');

    chats.addEventListener("click", function (event) {

        const chat = event.target.closest(".chat_room");
        if (chat) {
            changeChat(chat.dataset.value)
        }

    });

});

function fetchMessages(val = window.receiverId) {

    const params = {
        sender_id: window.userId,
        receiver_id: val
    };

    fetch('../actions/action.getMessage.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            response.json()
                .then( j => {

                    fetch('../actions/action.getChats.php', {
                        method: 'POST',
                        body: JSON.stringify(params),
                    })
                        .then(response => {
                            return response.json()
                                .then(data => {

                                    console.log(data);

                                    const chats = document.getElementById('chats');
                                    chats.innerHTML = ``;

                                    data.forEach(chat => {

                                        if(window.userId != chat.user_id) {
                                                chats.innerHTML += `
                                                
                                                    <div class = 'chat_room' data-value = "${chat.user_id}">  
                                                        
                                                        <img src = ${chat.profile_picture ? chat.profile_picture : '../assets/style/images/default_image.jpg'}>
                                                        <a href = "#">
                                                            <h2>
                                                                ${chat.username}
                                                            </h2>
                                                        </a>
                                                    
                                                    </div>
                                                `;
                                        }
                                    });

                                    const main = document.getElementById("chat-box");
                                    main.innerHTML = ``;

                                        if(window.userId == window.receiverId){
                                            main.innerHTML = 'No Chat Available';
                                        }
                                        else {

                                            let batch = [];
                                            let id = -1;

                                            j.forEach(message => {

                                                if (message.sender_id == window.userId) {
                                                    main.innerHTML += `
                                                                <div class = 'message'>
                                                                    <div class = "sender">
                                                                        ${message.message}
                                                                    </div>
                                                                </div>
                                                            `
                                                } else {
                                                    main.innerHTML += `
                                                    <div class = 'message'>
                                                        <div class = "receiver">
                                                            ${message.message}
                                                        </div>
                                                    </div>
                                                `
                                                }
                                            });
                                        }

                                                        })


                                            });
                                        });

                                })

                        }




function changeChat(val) {
    window.receiverId = val;
    fetchMessages(val);
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

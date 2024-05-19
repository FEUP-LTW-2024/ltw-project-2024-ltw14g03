
window.scrolldown = 3;

document.addEventListener('DOMContentLoaded', function() {
    const chats = document.getElementById('chats');

    chats.addEventListener("click", function (event) {
        const chat = event.target.closest(".chat_room");
        if (chat) {
            changeChat(chat.dataset.value);
            getChats(chat.dataset.value);
        }
    });
});

function getChats(val = window.receiverId) {
    const params = {
        sender_id: window.userId,
        receiver_id: (val ? val : window.userId),
    };

    console.log('Sending getChats request with params:', params);  // Debugging log

    fetch('../actions/action.getChats.php', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'  // Ensure the request is JSON
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Received getChats response:', data);  // Debugging log

            const chats = document.getElementById('chats');
            chats.innerHTML = '';

            data.forEach(chat => {

                if (chat.user_id != undefined) {
                    if (window.userId != chat.user_id) {

                        if(window.receiverId == chat.user_id) {

                            chats.innerHTML += `
                                <div class='chat_room-sel' data-value="${chat.user_id}">  
                                    <img src="${chat.profile_picture ? chat.profile_picture : '../assets/style/images/default_image.jpg'}">
                                    <a href="#">
                                        <h2>${chat.username}</h2>
                                    </a>
                                </div>
                            `;
                        }
                        else
                        {
                            chats.innerHTML += `
                                <div class='chat_room' data-value="${chat.user_id}">  
                                    <img src="${chat.profile_picture ? chat.profile_picture : '../assets/style/images/default_image.jpg'}">
                                    <a href="#">
                                        <h2>${chat.username}</h2>
                                    </a>
                                </div>
                            `;
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error in getChats:', error);  // Debugging log
        });
}

function fetchMessages(val = window.receiverId) {


    if(!val || val === window.userId){

        const main = document.getElementById("chat-box");
        if(main)main.innerHTML = 'No Chat Selected.';

        return;
    }

    const params = {
        sender_id: window.userId,
        receiver_id: val
    };

    fetch('../actions/action.getMessage.php', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'  // Ensure the request is JSON
        }
    })
        .then(response => response.json())
        .then(data => {

            const main = document.getElementById("chat-box");
            main.innerHTML = '';

            if (window.userId == window.receiverId) {
                main.innerHTML = 'No Chat Available';
            } else {
                data.forEach(message => {
                    if (message.sender_id == window.userId) {
                        main.innerHTML += `
                        <div class='message'>
                            <div class="sender">${message.message}</div>
                        </div>
                    `;
                    } else {
                        main.innerHTML += `
                        <div class='message'>
                            <div class="receiver">${message.message}</div>
                        </div>
                    `;
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error in fetchMessages:', error);  // Debugging log
        });

    if(window.scrolldown > 0){
        scrollToBottom();
    }
}

function changeChat(val) {
    window.receiverId = val;
    window.scrolldown = 3;
}


function sendMessage() {

    const minput = document.getElementById("message-input");

    var message = minput.value;
    minput.value = "";

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
        headers: {
            'Content-Type': 'application/json'  // Ensure the request is JSON
        }
    })
        .then(async response => {
            window.scrolldown = 3;
            return response;
        })
}


function scrollToBottom() {
    const chatbox = document.getElementById("chat-box");
    if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
        window.scrolldown -= 1;
    }
}

async function initializeChat() {
    try {
        await getChats();
        await fetchMessages();
        setInterval(gettexts, 200);
    } catch (error) {
        console.error('Error in initializeChat:', error);  // Debugging log
    }
}

async function gettexts() {
    try {
        await fetchMessages();
    } catch (error) {
        console.error('Error in initializeChat:', error);  // Debugging log
    }
}

initializeChat();
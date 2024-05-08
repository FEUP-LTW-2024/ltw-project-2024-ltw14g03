    document.addEventListener('DOMContentLoaded', function() {

        const main = document.getElementById("profile_info");

        const urlParams = new URLSearchParams(window.location.search);
        const jsonDataParam = urlParams.get('data');
        const jsonDataString = decodeURIComponent(jsonDataParam);
        const data = JSON.parse(jsonDataString);

        main.innerHTML = `
            <h1>Seller Profile</h1>

            <div class="profile-detail">
                <img src= "${data.profile_picture}" id="imageprofile" alt="Profile Picture">
            </div>
    
            <div class="profile-text">
                <div class="profile-detail">
                    <h2 id="username">${data.username}</h2>
                </div>
    
                <div class="profile-detail">
                    <label for="email">Email:</label>
                    <span id="email">${data.email}</span>
                </div>
    
                <div class="profile-detail">
                    <label for="fullName">Full Name:</label>
                    <span id="fullName">${data.firstName} ${data.lastName}</span>
                </div>
             </div>
                <!-- Button to go to chat page -->
             <button class="profile-button" onclick="window.location.href='chat.php?receiver_id=<?php echo $sellerId; ?>'">Chat with Seller</button>
        `;



    });
document.addEventListener("DOMContentLoaded", function() {

    const profileInfo = document.querySelector('.profile-info');

    profileInfo.addEventListener('click', function(event) {
        if (event.target.id === 'editProfileBtn') {
            toggleEditState(true);
        } else if (event.target.id === 'saveProfileBtn') {
            saveProfile();
        }

    });

    function toggleEditState(isEditState) {

        const pfp = document.getElementById('pfp_edit');
        const fullNameSpan = document.getElementById('fullName');
        const btn = document.querySelector('.profile-button');

        if (isEditState) {

            const fullName = fullNameSpan.textContent.split(' ');
            fullNameSpan.innerHTML = `
                
                <input type="text" id="editFirstName" value="${fullName[0]}"> <input type="text" id="editLastName" value="${fullName[1] || ''}">
            `;

            btn.textContent = 'Save Profile';
            btn.id = 'saveProfileBtn';

            pfp.innerHTML = `
                <form id = "pfpform" action = "../actions/action.uploadProfileImage.php" method="post" enctype="multipart/form-data">
                    <label for="profilePicture">Change Profile Picture:</label>
                    <input type="file" id="pfpInput" name="profilePicture" accept="image/*">
                </form>
            `;

        } else {
            // Update display with the input values, assuming they are valid
            fullNameSpan.textContent = `${document.getElementById('editFirstName').value} ${document.getElementById('editLastName').value}`;

            btn.textContent = 'Edit Profile';
            btn.id = 'editProfileBtn';

            document.getElementById("pfpform").submit();

            pfp.innerHTML = ``;

        }
    }

    function saveProfile() {

        const updatedFirstName = document.getElementById('editFirstName').value;
        const updatedLastName = document.getElementById('editLastName').value;
    
        fetch('../actions/action.editProfile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `firstName=${encodeURIComponent(updatedFirstName)}&lastName=${encodeURIComponent(updatedLastName)}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Profile updated successfully');
                toggleEditState(false);
            } else {
                alert(data.error || 'Unknown error occurred');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save the profile. Please try again.');
        });
    }
    
});

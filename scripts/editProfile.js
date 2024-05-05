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
        const fullNameSpan = document.getElementById('fullName');
        const btn = document.querySelector('.profile-button');

        if (isEditState) {
            const fullName = fullNameSpan.textContent.split(' ');
            fullNameSpan.innerHTML = `<input type="text" id="editFirstName" value="${fullName[0]}"> <input type="text" id="editLastName" value="${fullName[1] || ''}">`;

            btn.textContent = 'Save Profile';
            btn.id = 'saveProfileBtn';
        } else {
            // Update display with the input values, assuming they are valid
            fullNameSpan.textContent = `${document.getElementById('editFirstName').value} ${document.getElementById('editLastName').value}`;

            btn.textContent = 'Edit Profile';
            btn.id = 'editProfileBtn';
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

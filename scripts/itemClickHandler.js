document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        event.stopImmediatePropagation();
        const itemElement = event.target.closest('.item');
        
        if (itemElement) {
            const itemID = itemElement.getAttribute('data-value');
            
            selectsSellOrder(itemID);
        }
    });
});

function selectsSellOrder(itemID) {
    const params = {
        itemID: itemID
    };
    console.log(params); 

    fetch('../actions/action.getSpecificSellOrder.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(params),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('Response Data:', data); // Log the response data for debugging
        showModal(data);
    })
    .catch(error => {
        console.error('Error selecting sell order:', error);
    });
}


function showModal(data) {
    const sellOrder = data.sellOrder;

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('full-page-modal');

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('container');

    // Create item info div
    const itemInfoDiv = document.createElement('div');
    itemInfoDiv.classList.add('item-info');

    // ITEM IMAGE
    const itemImage = document.createElement('img');
    itemImage.src = sellOrder.images[0].image_url; 
    itemImage.alt = 'Item Image';
    itemImage.classList.add('modal-image');
    itemInfoDiv.appendChild(itemImage);

    // ITEM  NAME
    const itemName = document.createElement('h2');
    itemName.textContent = sellOrder.name;
    itemInfoDiv.appendChild(itemName);

    // ITEM PRICE
    const itemPrice = document.createElement('p');
    itemPrice.textContent = 'Price: ' + sellOrder.price + '€';
    itemInfoDiv.appendChild(itemPrice);

    // ITEM DESCRIPTION
    const itemDescription = document.createElement('p');
    itemDescription.textContent = sellOrder.description;
    itemInfoDiv.appendChild(itemDescription);

    modalContent.appendChild(itemInfoDiv);

    // SELLER DIV
    const sellerInfoDiv = document.createElement('div');
    sellerInfoDiv.classList.add('seller-info');

    // CLOSE BUTTON
    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        modalContainer.style.display = 'none';
        modalContainer.remove();
    };
    sellerInfoDiv.appendChild(closeButton); // Append close button to seller info div

    // SELLER IMAGE
    const sellerImage = document.createElement('img');
    sellerImage.src = sellOrder.seller.profile_picture; 
    sellerImage.alt = 'Seller Image';
    sellerImage.classList.add('modal-seller-image');
    sellerInfoDiv.appendChild(sellerImage);

    // SELLER NAME
    const sellerName = document.createElement('h2');
    sellerName.textContent = sellOrder.seller.firstName + ' ' + sellOrder.seller.lastName;
    sellerInfoDiv.appendChild(sellerName);

    // CHAT WITH SELLER
    const profileButton = document.createElement('button');
    profileButton.textContent = 'View Seller Profile';
    profileButton.classList.add('modal-contact-button');
    profileButton.onclick = function() {
        showUser(sellOrder.seller.user_id);
    }
    sellerInfoDiv.appendChild(profileButton);

    const contactButton = document.createElement('button');
    contactButton.textContent = 'Chat with Seller';
    contactButton.classList.add('modal-contact-button');
    contactButton.onclick = function() {
        redirectToChat(sellOrder.seller.user_id);
    }
    sellerInfoDiv.appendChild(contactButton);

    modalContent.appendChild(sellerInfoDiv);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
}

/* EQUIVALENT THO THIS

<div class="full-page-modal">
        <div class="container">
            <div class="item-info">
                <img src="https://via.placeholder.com/500" alt="Placeholder Image">
                <h2>Item Name</h2>
                <p>Item Price</p>
                <p>Item Description</p>
            </div>
            <div class="seller-info">
                <img src="https://via.placeholder.com/100" alt="Placeholder Seller Image">
                <h2>Seller Name</h2>
                <button class="modal-contact-button">Contact Seller</button>
                <!-- Add seller info here -->
            </div>
            <span class="close">&times;</span>
        </div>
    </div>


*/


function showUser(userID){

    const params = {
        ID : userID,
    };

    fetch('../actions/action.getUser.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            window.location.href = `../pages/profileseller.php?data=${encodeURIComponent(JSON.stringify(data))}`;

        })

}

function redirectToChat(sellerId) {
    window.location.href = `chat.php?receiver_id=${sellerId}`;
}
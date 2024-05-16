document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('click', function(event) {

        const itemElement = event.target.closest('.item');
        const wishlistButton = event.target.closest(".wishlistButton");
        const dewishlistButton = event.target.closest(".de-wishlistButton");
        
        const checkoutButton = event.target.closest(".checkoutlistButton");
        const decheckoutButton = event.target.closest(".de-checkoutButton");

        const removeButton = event.target.closest(".removeButton");

        event.stopPropagation();

        if (wishlistButton) {
            addWishlist(wishlistButton.dataset.value, wishlistButton.dataset.page);

            const wishlistDIV = event.target.closest(".wishlist");

            wishlistDIV.innerHTML = `
                
                <button class="de-wishlistButton" id="button${wishlistButton.dataset.ID}" data-value="${wishlistButton.dataset.value}" data-page="${wishlistButton.dataset.page}" data-ID="${wishlistButton.dataset.ID}" type="button">De-Wishlist</button>
            
            `;

        } else if (dewishlistButton) {

            removeWishlist(dewishlistButton.dataset.value, dewishlistButton.dataset.page);

            const wishlistDIV = event.target.closest(".wishlist");

            wishlistDIV.innerHTML = `
                
                <button class="wishlistButton" id="button${dewishlistButton.dataset.ID}" data-value="${dewishlistButton.dataset.value}" data-page="${dewishlistButton.dataset.page}" data-ID="${dewishlistButton.dataset.ID}">Wishlist</button>
            
            `;

        }
        else if (checkoutButton) {

            addcheckout(checkoutButton.dataset.value, checkoutButton.dataset.page);

            const checkoutDIV = event.target.closest(".checkout");

            checkoutDIV.innerHTML = `
                
                <button class="wishlistButton" id="button${checkoutButton.dataset.ID}" data-value="${checkoutButton.dataset.value}" data-page="${checkoutButton.dataset.page}" data-ID="${checkoutButton.dataset.ID}">Wishlist</button>
            
            `;

        }
        else if (decheckoutButton) {

            removecheckout(decheckoutButton.dataset.value, decheckoutButton.dataset.page);

            const checkoutDIV = event.target.closest(".checkout");

            checkoutDIV.innerHTML = `
                
                <button class="wishlistButton" id="button${decheckoutButton.dataset.ID}" data-value="${decheckoutButton.dataset.value}" data-page="${decheckoutButton.dataset.page}" data-ID="${decheckoutButton.dataset.ID}">Wishlist</button>
            
            `;

        }
        else if (removeButton) {
            event.stopPropagation(); // Prevent event propagation
            const itemId = removeButton.dataset.value;
            removeItem(itemId);

        } 
        else if (itemElement) {
            const itemID = itemElement.getAttribute('data-value');

            selectsSellOrder(itemID);
        }

    });


    function addWishlist(val, page) {

        params = {
            ID: val,
        }

        fetch('../actions/action.addWishlist.php', {
            method: 'POST',
            body: JSON.stringify(params),
        })
            .then(response => {
                return response.text()
                    .then(t => {
                        console.log("lmao");
                    });
            })


    }

    function removeWishlist(val, page){

        params = {
            ID: val,
        }

        fetch('../actions/action.removeWishlist.php', {
            method: 'POST',
            body: JSON.stringify(params),
        })
            .then(response => {
                return response.text()
                    .then(t => {
                        console.log("lol");
                    });
            })


    }

});

function addcheckout(val, page){

    params = {
        ID: val,
    }

    fetch('../actions/action.addCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.text()
                .then(t => {
                    fetchSellOrders(parseInt(page), false);
                });
        })
        .catch(error => {
            console.error('Error adding to checkout list: ', error);
        });
}

function removecheckout(val, page){

    params = {
        ID: val,
    }

    fetch('../actions/action.removeCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.text()
                .then(t => {
                    fetchSellOrders(parseInt(page), false);
                });
        })


}

async function removeItem(itemId) {
    console.log('Removing item with ID:', itemId);
    try {
        const response = await fetch('../actions/action.removeItem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item_id: itemId })
        });

        if (!response.ok) {
            throw new Error('Error removing item: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Remove response data:', data);

        if (data.success) {
            fetchItems(0); // Refresh items list
        } else {
            console.error('Failed to remove item:', data.message);
        }
    } catch (error) {
        console.error('Error removing item:', error);
    }
}

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
    if(window.userId != sellOrder.seller.user_id) {
        const profileButton = document.createElement('button');
        profileButton.textContent = 'View Seller Profile';
        profileButton.classList.add('modal-contact-button');
        profileButton.onclick = function () {
            showUser(sellOrder.seller.user_id);
        }
        sellerInfoDiv.appendChild(profileButton);
    }
    else
    {
        const profileButton = document.createElement('button');
        profileButton.textContent = 'View Seller Profile';
        profileButton.classList.add('modal-contact-button');
        profileButton.onclick = function () {
            window.location.href = `../pages/profile.php`;
        }
        sellerInfoDiv.appendChild(profileButton);
    }

    if(window.userId != sellOrder.seller.user_id) {
        const contactButton = document.createElement('button');
        contactButton.textContent = 'Chat with Seller';
        contactButton.classList.add('modal-contact-button');
        contactButton.onclick = function () {
            redirectToChat(sellOrder.seller.user_id);
        }
        sellerInfoDiv.appendChild(contactButton);
    }

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
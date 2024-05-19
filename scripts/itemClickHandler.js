document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('click', function(event) {

        const itemElement = event.target.closest('.item');
        const wishlistButton = event.target.closest(".wishlistButton");
        const dewishlistButton = event.target.closest(".de-wishlistButton");
        
        const checkoutButton = event.target.closest(".checkoutlistButton");
        const decheckoutButton = event.target.closest(".de-checkoutButton");

        const finishSaleButton = event.target.closest(".finishSale");
        const shippingForm = event.target.closest(".shippingForm");


        const removeButton = event.target.closest(".removeButton");

        event.stopPropagation();

        if (wishlistButton) {
        } else if (dewishlistButton) {
        } else if (checkoutButton) {
        } else if (decheckoutButton) {
        }else if (removeButton) {
        } else if (finishSaleButton) {
        } else if (shippingForm) {
        }else if (itemElement) {
            const itemID = itemElement.getAttribute('data-value');

            selectsSellOrder(itemID);
        }

    });

});

function addcheckout(val, page){

    params = {
        ID: val,
    }

    fetch('../actions/action.addCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
}

function removecheckout(val, page){

    params = {
        ID: val,
    }

    fetch('../actions/action.removeCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
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
            fetchItems(0);
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
        console.log('Response Data:', data);
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

    const itemCondition = document.createElement('p');
    itemCondition.textContent = 'Condition: ' + sellOrder.condition.name;
    itemInfoDiv.appendChild(itemCondition);

    const itemCategory = document.createElement('p');
    itemCategory.textContent = 'Category: ' + sellOrder.category.name;
    itemInfoDiv.appendChild(itemCategory);

    const itemBrand = document.createElement('p');
    itemBrand.textContent = 'Brand: ' + sellOrder.brand.name;
    itemInfoDiv.appendChild(itemBrand);

    const itemSize = document.createElement('p');
    itemSize.textContent = 'Size: ' + sellOrder.size.name;
    itemInfoDiv.appendChild(itemSize);
    

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
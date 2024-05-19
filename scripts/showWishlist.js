document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.querySelector('#productList');

    // Fetch wishlist items
    fetchWishlistItems();

    function fetchWishlistItems() {
        fetch('../actions/action.getWishlistItems.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                displayWishlistItems(data.wishlistItems);
            } else {
                console.error('Error fetching wishlist items:', data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching wishlist items:', error);
        });
    }

    function displayWishlistItems(items) {
        console.log('Wishlist items:', items);
        resultDiv.innerHTML = '';

        if (items.length === 0) {
            resultDiv.innerHTML = '<p>No items in wishlist.</p>';
            return;
        }

        items.forEach(item => {
            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';
            let wishlistButton = '';
            let checkoutButton = '';

            if (item.wish==='true'){
                wishlistButton = `
                <button class="de-wishlistButton" data-value="${item.item_id}" onclick="removeFromWishlist(${item.item_id})">De-Wishlist</button>
            `;
            }else if(item.wish==='false'){
                wishlistButton = `
                <button class="wishlistButton" data-value="${item.item_id}" onclick="addWishlist(${item.item_id})">Wishlist</button>
            `;
            }

            if (item.cart==='true'){
                checkoutButton = `
                <button class="de-checkoutButton" data-value="${item.item_id}" onclick="removeFromCart(${item.item_id})">Remove from Cart</button>
            `;
            }else if(item.cart==='false'){
                checkoutButton = `
                <button class="checkoutlistButton" data-value="${item.item_id}" onclick="addToCart(${item.item_id})">Add to Cart</button>
            `;
            }



            resultDiv.innerHTML += `
                <div class="item" id="item_${item.item_id}" data-value="${item.item_id}">
                    <img src="${imageSrc}" alt="Item Image">
                    <div class="desc">
                        <h3>${item.name}</h3>
                        <p style="margin-top: 0.2em">${item.description}</p>
                        <div class="details">
                            <p>Price: ${item.price}€</p>
                            <p>Condition: ${item.condition}</p>
                            <p>Category: ${item.category}</p>
                            <p>Brand: ${item.brand}</p>
                            <p>Size: ${item.size}</p>
                        </div>
                        <div class="actions">
                            ${wishlistButton}
                            ${checkoutButton}
                        </div>
                    </div>
                </div>
            `;
        });

        // Add event listeners to wishlist buttons
        document.querySelectorAll('.de-wishlistButton').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-value');
                removeFromWishlist(itemId);
            });
        });
    }
});


function addWishlist(val) {
    console.log("Add to wishlist: ", val);
    fetch('../actions/action.addWishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: val }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.wishlistButton[data-value="${val}"]`);
            button.textContent = 'De-Wishlist';
            button.classList.remove('wishlistButton');
            button.classList.add('de-wishlistButton');
            button.setAttribute('onclick', `removeWishlist(${val})`);
            console.log('Item successfully added to wishlist:', val);
        } else {
            console.error('Failed to add item to wishlist:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}


 function addWishlist(val) {
    console.log("Add to wishlist: ", val);
    fetch('../actions/action.addWishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: val }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.wishlistButton[data-value="${val}"]`);
            button.textContent = 'De-Wishlist';
            button.classList.remove('wishlistButton');
            button.classList.add('de-wishlistButton');
            button.setAttribute('onclick', `removeWishlist(${val})`);
            console.log('Item successfully added to wishlist:', val);
        } else {
            console.error('Failed to add item to wishlist:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function removeWishlist(val){
    console.log("Remove from wishlist: ", val);
    fetch('../actions/action.removeWishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: val }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.de-wishlistButton[data-value="${val}"]`);
            button.textContent = 'Wishlist';
            button.classList.remove('de-wishlistButton');
            button.classList.add('wishlistButton');
            button.setAttribute('onclick', `addWishlist(${val})`);
            console.log('Item successfully removed from wishlist:', val);
        } else {
            console.error('Failed to remove item from wishlist:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addCart(val){
    console.log("Add to cart: ", val);
    fetch('../actions/action.addCheckoutlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: val }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.checkoutlistButton[data-value="${val}"]`);
            button.textContent = 'Remove from Cart';
            button.classList.remove('checkoutlistButton');
            button.classList.add('de-checkoutButton');
            button.setAttribute('onclick', `removeCart(${val})`);
            console.log('Item successfully added to cart:', val);
        } else {
            console.error('Failed to add item to cart:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function removeCart(val){
    console.log("Remove from cart: ", val);
    fetch('../actions/action.removeCheckoutlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: val }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.de-checkoutButton[data-value="${val}"]`);
            button.textContent = 'Add to Cart';
            button.classList.remove('de-checkoutButton');
            button.classList.add('checkoutlistButton');
            button.setAttribute('onclick', `addCart(${val})`);
            console.log('Item successfully removed from cart:', val);
        } else {
            console.error('Failed to remove item from cart:', data.error);
        }
    })
}

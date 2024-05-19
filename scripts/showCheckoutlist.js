document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('productList');
    let totalPrice = 0;

    const params = { start: 0 };

    loadCheckoutList(params, container);

    document.getElementById('clearCartButton').addEventListener('click', clearCart);
});

function loadCheckoutList(params, container) {
    fetch('../actions/action.getCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Data: ", data);
        let totalPrice = 0;
        container.innerHTML = '';

        const items = data.cartItems;

        items.forEach(item => {
            console.log("Item: ", item);
            totalPrice += parseFloat(item.price);

            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';
            let wishlistButton = '';
            let checkoutButton = '';

            if (item.wish === 'false') {
                wishlistButton = `<button class="wishlistButton" data-value="${item.item_id}" onclick="addWishlist(${item.item_id})">Wishlist</button>`;
            } else if (item.wish === 'true') {
                wishlistButton = `<button class="de-wishlistButton" data-value="${item.item_id}" onclick="removeWishlist(${item.item_id})">De-Wishlist</button>`;
            }

            if (item.cart === 'false') {
                checkoutButton = `<button class="checkoutButton" data-value="${item.item_id}" onclick="addCart(${item.item_id})">Add to cart</button>`;
            } else if (item.cart === 'true') {
                checkoutButton = `<button class="de-checkoutButton" data-value="${item.item_id}" onclick="removeCart(${item.item_id})">Remove from Cart</button>`;
            }

            container.innerHTML += `
                <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${container.children.length / 8}s;">
                    <img src="${imageSrc}" alt="Item Image">
                    <div class="desc">
                        <h3>${item.name}</h3>
                        <p style="margin-top: 0.2em">${item.description}</p>
                        <div class="details">
                            <p>Price: ${item.price}€</p>
                            <p>Condition: ${item.condition.name}</p>
                            <p>Category: ${item.category.name}</p>
                            <p>Brand: ${item.brand.name}</p>
                            <p>Size: ${item.size.name}</p>
                        </div>
                        <div class="actions">
                            ${wishlistButton}
                            ${checkoutButton}
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById('totalPricePlaceholder').textContent = totalPrice.toFixed(2);
    })
    .catch(error => {
        alert('Error loading data: ' + error);
    });
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



function removeWishlist(itemId) {
    const params = { item_id: itemId };

    fetch('../actions/action.removeWishlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const itemDiv = document.getElementById(`item_${itemId}`);
                itemDiv.querySelector('.actions').innerHTML = `<button class="wishlistButton" data-value="${itemId}" onclick="addToWishlist(${itemId})">Wishlist</button>`;
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

function removeCart(itemId) {
    const params = { item_id: itemId };

    fetch('../actions/action.removeCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const itemDiv = document.getElementById(`item_${itemId}`);
                itemDiv.querySelector('.actions').innerHTML = `<button class="checkoutlistButton" data-value="${itemId}" onclick="addToCart(${itemId})">Add to Cart</button>`;

                const item = document.querySelector(`#item_${itemId}`);
                item.remove();

                const totalPrice = document.getElementById('totalPricePlaceholder');
                $item_price = item.querySelector('.details').querySelector('p').textContent;
                $item_price = $item_price.split(' ')[1];
                totalPrice.textContent = (parseFloat(totalPrice.textContent) - parseFloat($item_price)).toFixed(2);
            } else {
                console.error('Failed to remove item from cart:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

function clearCart() {
    console.log("Clearing cart");
    fetch('../actions/action.clearCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify({ clear: true }), // Send a signal to clear the cart
    })
        .then(response => response.text())
        .then(text => {
            loadCheckoutList({ start: 0 }, document.getElementById('productList'));
        })
        .catch(error => {
            alert('Error clearing cart: ' + error);
        });
}

function changePage(val) {
    const params = { start: val };

    fetch('../actions/action.getCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('productList');
            container.innerHTML = '';
            const cartItems = data.cartItems;
            cartItems.forEach(item => {
                const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg'; // Use default image if item.image is falsy
                container.innerHTML += `
                    <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${container.children.length / 8}s;">
                        <img src="${imageSrc}" alt="Item Image">
                        <div class="desc">
                            <h3>${item.name}</h3>
                            <p style="margin-top: 0.2em">${item.description}</p>
                            <div class="details">
                                <p>Price: ${item.price}€</p>
                                <p>Condition: ${item.condition_id}</p>
                            </div>
                            <div class="actions">
                                <button class="checkoutButton" data-value="${item.item_id}" onclick="removeFromCart(${item.item_id})">Remove</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            alert('Error loading data: ' + error);
        });
}

let currentPage = 0;

function fetchSellOrders(start, animate = true) {
    const container = document.getElementById('productList');
    container.innerHTML = "";

    const params = { start: start }; // Adjusting the start to fetch based on page
    console.log("PARAMS: ", params);
    let count = 0;

    fetch('../actions/action.getSellOrders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console
        if (data.length === 0) {
            container.innerHTML = '<p>No results found.</p>';
            return;
        }

        data.forEach((item, index) => {
            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';
            let wishlistButton = '';
            let checkoutButton = '';

            if (item.wish === 'true') {
                wishlistButton = `<button class="de-wishlistButton" data-value="${item.item_id}" onclick="removeWishlist(${item.item_id})">De-Wishlist</button>`;
            } else if (item.wish === 'false') {
                wishlistButton = `<button class="wishlistButton" data-value="${item.item_id}" onclick="addWishlist(${item.item_id})">Wishlist</button>`;
            }

            if (item.cart === 'true') {
                checkoutButton = `<button class="de-checkoutButton" data-value="${item.item_id}" onclick="removeCart(${item.item_id})">Remove from Cart</button>`;
            } else if (item.cart === 'false') {
                checkoutButton = `<button class="checkoutlistButton" data-value="${item.item_id}" onclick="addCart(${item.item_id})">Add to Cart</button>`;
            }

            container.innerHTML += `
                <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${index / 8}s;">
                    <img src="${imageSrc}" alt="Item Image">
                    <div class="desc">
                        <h3>${item.name}</h3>
                        <p style="margin-top: 0.2em">${item.description}</p>
                        <div>
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
                </div>
            `;
            count++;
        });
    })
    .catch(error => {
        alert('Error loading data: ' + error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.URL.includes("index.php")) {
        fetchSellOrders(currentPage);
    }
});

function changePage(val) {
    console.log("VAL: ", val);
    currentPage = val;
    fetchSellOrders(currentPage);
    console.log("CURRENT PAGE: ", currentPage);
}

function addWishlist(itemId) {
    fetch('../actions/action.addWishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.wishlistButton[data-value="${itemId}"]`);
            button.textContent = 'De-Wishlist';
            button.classList.remove('wishlistButton');
            button.classList.add('de-wishlistButton');
            button.setAttribute('onclick', `removeWishlist(${itemId})`);
        } else {
            console.error('Failed to add item to wishlist:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function removeWishlist(itemId) {
    fetch('../actions/action.removeWishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.de-wishlistButton[data-value="${itemId}"]`);
            button.textContent = 'Wishlist';
            button.classList.remove('de-wishlistButton');
            button.classList.add('wishlistButton');
            button.setAttribute('onclick', `addWishlist(${itemId})`);
        } else {
            console.error('Failed to remove item from wishlist:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addCart(itemId) {
    fetch('../actions/action.addCheckoutlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.checkoutlistButton[data-value="${itemId}"]`);
            button.textContent = 'Remove from Cart';
            button.classList.remove('checkoutlistButton');
            button.classList.add('de-checkoutButton');
            button.setAttribute('onclick', `removeCart(${itemId})`);
        } else {
            console.error('Failed to add item to cart:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function removeCart(itemId) {
    fetch('../actions/action.removeCheckoutlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`.de-checkoutButton[data-value="${itemId}"]`);
            button.textContent = 'Add to Cart';
            button.classList.remove('de-checkoutButton');
            button.classList.add('checkoutlistButton');
            button.setAttribute('onclick', `addCart(${itemId})`);
        } else {
            console.error('Failed to remove item from cart:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}


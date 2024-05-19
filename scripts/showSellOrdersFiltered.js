let fetchResults = null; 
let hasLoadedFromURL = false;
let currentPage = 0;

function updateFormData(form, categorySelect, startValue = '0') {
    const formData = new FormData(form);
    formData.append('start', startValue);
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    
    if (selectedCategory && !hasLoadedFromURL) {
        categorySelect.value = selectedCategory;
        hasLoadedFromURL = true;
    }
    
    return new URLSearchParams(formData).toString();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const categorySelect = document.getElementById('category');
    const resultDiv = document.querySelector('.searchResult');
    
    fetchResults = (startValue = '0') => {
        const params = updateFormData(form, categorySelect, startValue);
        fetch(`../actions/action.getSellOrdersFilter.php?${params}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                displayResults(data);
                console.log('Data received:', data);
            })
            .catch(error => console.error('Error:', error));
    };

    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    if (urlCategory) {
        categorySelect.value = urlCategory;
    }

    fetchResults();

    form.addEventListener('change', function(event) {
        event.preventDefault();
        fetchResults();
    });

    function displayResults(data) {
        console.log('Displaying results:', data);
        resultDiv.innerHTML = '';

        if (data.length === 0) {
            resultDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        data.forEach((item, count) => {
            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';
            let wishlistButton = '';
            let checkoutButton = '';

            console.log("WISHLISTED?: ", item.wish);
            if (item.wish === "true"){
                wishlistButton = `
                    <button class="de-wishlistButton" data-value="${item.item_id}" onclick="removeWishlist(${item.item_id})">De-Wishlist</button>
                `;
            }else if (item.wish === 'false') {
                wishlistButton = `
                    <button class="wishlistButton" data-value="${item.item_id}" onclick="addWishlist(${item.item_id})">Wishlist</button>
                `;
            }

            console.log("CART?: ", item.cart);
            if (item.cart === 'true'){
                checkoutButton = `
                    <button class="de-checkoutButton" data-value="${item.item_id}" onclick="removeCart(${item.item_id})">Remove from Cart</button>
                `;
            }else if (item.cart === 'false') {
                checkoutButton = `
                    <button class="checkoutlistButton" data-value="${item.item_id}" onclick="addCart(${item.item_id})">Add to Cart</button>
                `;
            }

            resultDiv.innerHTML += `
                <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s;">
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
                            <div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
});

function changePage(val) {
    console.log("Change page to: ", val);
    currentPage = val;
    fetchResults(val.toString());
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

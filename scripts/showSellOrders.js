
function fetchSellOrders(start, animate = true) {

    const container = document.getElementById('productList');
    container.innerHTML = "";

    const params = { start: start };
    let html = '';
    let count = 0;

    fetch('../actions/action.getSellOrders.php', {
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

            data.forEach(item => {

                const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';

                if (item.wish === '0') {
                    if (item.cart === '0') {
                        // Case: Not in any
                        container.innerHTML += `
                                        <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s; ">
                                            <img src="${imageSrc}" alt="Item Image">
                                            <div class="desc">
                                                <h3>${item.name}</h3>
                                                <p style="margin-top: 0.2em">${item.description}</p>
                                                <div style="display: flex">
                                                    <div class="details">
                                                        <p>Price: ${item.price}€</p>
                                                        <p>Condition: ${item.condition_id}</p>
                                                    </div>
                                        <button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}">Wishlist</button>
                                        <button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        // Case: In checkout but not in wishlist
                        container.innerHTML += `
                            <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s;">
                                <img src="${imageSrc}" alt="Item Image">
                                <div class="desc">
                                    <h3>${item.name}</h3>
                                    <p style="margin-top: 0.2em">${item.description}</p>
                                    <div style="display: flex">
                                        <div class="details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>
                                        <button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" type="button">Wishlist</button>
                                        <button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" type="button">De-Checkout</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    if (item.cart === '0') {
                        // Case: In wishlist but not in checkout
                        container.innerHTML += `
                            <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s;">
                                <img src="${imageSrc}" alt="Item Image">
                                <div class="desc">
                                    <h3>${item.name}</h3>
                                    <p style="margin-top: 0.2em">${item.description}</p>
                                    <div style="display: flex">
                                        <div class="details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>
                                        <button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}">De-Wishlist</button>
                                        <button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        // Case: In both
                        container.innerHTML += `
                            <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s;">
                                <img src="${imageSrc}" alt="Item Image">
                                <div class="desc">
                                    <h3>${item.name}</h3>
                                    <p style="margin-top: 0.2em">${item.description}</p>
                                    <div style="display: flex">
                                        <div class="details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>
                                        <button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}">De-Wishlist</button>
                                        <button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${start}">De-Checkout</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }

                count += 1;

            })
        })
        .catch(error => {
            alert('Error loading data: ' + error);
        });

}

// Perform initial check for index.php page
if (document.URL.includes("index.php")) {

    document.addEventListener('DOMContentLoaded', function() {
        // Container for product list
        const container = document.getElementById('productList');

        // Function to fetch sell orders and update the DOM

        // Fetch sell orders when DOM is loaded
        fetchSellOrders(0);

        // Add click event listener to wishlist and checkout buttons
        container.addEventListener("click", function(event) {
            const wishlistButton = event.target.closest(".wishlistButton");
            const dewishlistButton = event.target.closest(".de-wishlistButton");

            const checkoutButton = event.target.closest(".checkoutlistButton"); // Corrected class name
            const decheckoutButton = event.target.closest(".de-checkoutButton");
        
            if (wishlistButton) {
                event.stopPropagation();
                addWishlist(wishlistButton.dataset.value, wishlistButton.dataset.page);
            }
            else if (dewishlistButton) {
                event.stopPropagation();
                removeWishlist(dewishlistButton.dataset.value, dewishlistButton.dataset.page);
            } 
            else if (checkoutButton) { // Corrected condition
                event.stopPropagation();
                addcheckout(checkoutButton.dataset.value, checkoutButton.dataset.page);
            } 
            else if (decheckoutButton) {
                event.stopPropagation();
                removecheckout(decheckoutButton.dataset.value, decheckoutButton.dataset.page);
            } 
            else {
                const itemElement = event.target.closest(".item");
                if (itemElement) {
                    selectSellOrder(itemElement.dataset.value);
                }
            }
        });
    });
}

function addWishlist(val, page){

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
                    fetchSellOrders(parseInt(page), false);
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
                    fetchSellOrders(parseInt(page), false);
                });
        })


}

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

function selectSellOrder(itemID) {

    const params = {
      ID : itemID,
    };

    fetch('../actions/action.showSellOrder.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            window.location.href = `../pages/sellOrder.php?data=${encodeURIComponent(JSON.stringify(data))}`;

        })


    //your existing code goes here
}

function changePage(val){

    fetchSellOrders(val);

}
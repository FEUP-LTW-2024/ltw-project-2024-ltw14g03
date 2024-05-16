
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

                if(item.wish == '0'){
                    if(item.cart == '0'){ // not in wishlist or checkout
                    container.innerHTML += `
                                        <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s; ">
                                            <img src="${imageSrc}" alt="Item Image">
                                            <div class="desc">
                                                <h3>${item.name}</h3>
                                                <p style="margin-top: 0.2em">${item.description}</p>
                                                <div style="display: flex">
                                                    <div class="details">
                                                        <p>Price: ${item.price}€</p>
                                                        <p>Condition: ${item.condition.name}</p>
                                                        <p>Category: ${item.category.name}</p>
                                                        <p>Brand: ${item.brand.name}</p>
                                                        <p>Size: ${item.size.name}</p>
                                                    </div>
                                                    
                                                    <div class = 'wishlist'>
                                                        <button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Wishlist</button>
                                                    </div>
                                                    <div class = 'checkout'>
                                                        <button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Add to Cart</button>
                                                    </div>
      
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                                else{ // not in wishlist but in checkout
                                    container.innerHTML += `
                                                        <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s; ">
                                                            <img src="${imageSrc}" alt="Item Image">
                                                            <div class="desc">
                                                                <h3>${item.name}</h3>
                                                                <p style="margin-top: 0.2em">${item.description}</p>
                                                                <div style="display: flex">
                                                                    <div class="details">
                                                                        <p>Price: ${item.price}€</p>
                                                                        <p>Condition: ${item.condition.name}</p>
                                                                        <p>Category: ${item.category.name}</p>
                                                                        <p>Brand: ${item.brand.name}</p>
                                                                        <p>Size: ${item.size.name}</p>
                                                                    </div>
                                                                    
                                                                    <div class = 'wishlist'>
                                                                        <button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Wishlist</button>
                                                                    </div>
                                                                    <div class = 'checkout'>
                                                                        <button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Remove from Cart</button>
                                                                    </div>
                      
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;
                                                }
                }
                else if(item.wish == '1'){
                    if(item.cart == '0'){ // in wishlist but not in checkout
                    container.innerHTML += `
                                        <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s">
                                            <img src="${imageSrc}" alt="Item Image">
                                            <div class="desc">
                                                <h3>${item.name}</h3>
                                                <p style="margin-top: 0.2em">${item.description}</p>
                                                <div style="display: flex">
                                                    <div class="details">
                                                        <p>Price: ${item.price}€</p>
                                                        <p>Condition: ${item.condition.name}</p>
                                                        <p>Category: ${item.category.name}</p>
                                                        <p>Brand: ${item.brand.name}</p>
                                                        <p>Size: ${item.size.name}</p>
                                                    </div>
                                                    
                                                    <div class = 'wishlist'>
                                                        <button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}" type="button">De-Wishlist</button>
                                                    </div>
                                                    <div class = 'checkout'>
                                                        <button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Add to Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                                else{ // in wishlist and checkout
                                    container.innerHTML += `
                                                        <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s; ">
                                                            <img src="${imageSrc}" alt="Item Image">
                                                            <div class="desc">
                                                                <h3>${item.name}</h3>
                                                                <p style="margin-top: 0.2em">${item.description}</p>
                                                                <div style="display: flex">
                                                                    <div class="details">
                                                                        <p>Price: ${item.price}€</p>
                                                                        <p>Condition: ${item.condition.name}</p>
                                                                        <p>Category: ${item.category.name}</p>
                                                                        <p>Brand: ${item.brand.name}</p>
                                                                        <p>Size: ${item.size.name}</p>
                                                                    </div>
                                                                    
                                                                    <div class = 'wishlist'>
                                                                        <button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}" type="button">De-Wishlist</button>
                                                                    </div>
                                                                    <div class = 'checkout'>
                                                                        <button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Remove from Cart</button>
                                                                    </div>
                      
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;
                                                }
                }
                else
                {
                    container.innerHTML += `
                                        <div class="item" id="item_${item.item_id}" data-value="${item.item_id}" style="animation-delay: ${count / 8}s">
                                            <img src="${imageSrc}" alt="Item Image">
                                            <div class="desc">
                                                <h3>${item.name}</h3>
                                                <p style="margin-top: 0.2em">${item.description}</p>
                                                <div style="display: flex">
                                                    <div class="details">
                                                        <p>Price: ${item.price}€</p>
                                                        <p>Condition: ${item.condition.name}</p>
                                                        <p>Category: ${item.category.name}</p>
                                                        <p>Brand: ${item.brand.name}</p>
                                                        <p>Size: ${item.size.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
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
    });
}

function changePage(val){

    fetchSellOrders(val);

}
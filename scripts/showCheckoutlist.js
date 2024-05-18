
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('productList');
    let totalPrice = 0;

    const params = { start: 0};

    loadCheckoutList(params, container);

    // Event listener for "Clear Cart" button
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
        let totalPrice = 0;
        let count = 0;
        container.innerHTML = '';
        data.forEach(item => {
            totalPrice += parseFloat(item.price);

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
                                                        <button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}">Wishlist</button>
                                                    </div>
                                                    <div class = 'checkout'>
                                                        <button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}">Add to Cart</button>
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
                                                                        <button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}">Wishlist</button>
                                                                    </div>
                                                                    <div class = 'checkout'>
                                                                        <button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}">Remove from Cart</button>
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
                                                        <button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}" type="button">De-Wishlist</button>
                                                    </div>
                                                    <div class = 'checkout'>
                                                        <button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}">Add to Cart</button>
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
                                                                        <button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}" type="button">De-Wishlist</button>
                                                                    </div>
                                                                    <div class = 'checkout'>
                                                                        <button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${params['start']}" data-ID="${count}">Remove from Cart</button>
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

            count++;
        });
        document.getElementById('totalPricePlaceholder').textContent = totalPrice.toFixed(2);
    })
    .catch(error => {
        alert('Error loading data: ' + error);
    });
}

function removeCheckoutlist(val){

params = {
    ID: val,
}

fetch('../actions/action.removeCheckoutlist.php', {
    method: 'POST',
    body: JSON.stringify(params),
})
    .then(response => {
        return response.text()
            .then(t => {console.log(t)});
    })

}

function clearCart() {

    fetch('../actions/action.clearCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify({ clear: true }), // Send a signal to clear the cart

    })
    .then(response => response.text())
    .then(text => {
        console.log(text);
        // Reload the checkout list to reflect the cleared cart
        loadCheckoutList({ start: 0 }, document.getElementById('productList'));
    })
    .catch(error => {
        alert('Error clearing cart: ' + error);
    });
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

param = {
    start: val,
}

fetch('../actions/action.getCheckoutlist.php', {

    method: 'POST',
    body: JSON.stringify(param),

})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        const container = document.getElementById('productList');
        container.innerHTML = ``;
        let count= 0;
        data.forEach(item => {

            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg'; // Use default image if item.image is falsy

            container.innerHTML += `
                            <div class="item" id = "item_${item.item_id}" data-value= "${item.item_id}" style = "animation-delay: ${count/8}s">
                                <img src = " ${imageSrc}" alt="Item Image">
                                <div class = "desc">
                                    <h3>${item.name}</h3>
                                    <p style = "margin-top: 0.2em">"${item.description}"</p>
                                    
                                    <div style="display: flex">
                                        <div class = "details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>
                                        <button class="checkoutButton" data-value="${item.item_id}" onclick="removeCheckoutlist(${item.item_id})">Remove</button>
                                    </div>
                                    
                                </div>
                            </div>
                `;

            count +=1;


        });


    })
    .catch(error => {
        alert('Error loading data: ' + error);
    });

}
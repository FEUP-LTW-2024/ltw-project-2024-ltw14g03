
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    categorySelect = document.getElementById('category');


    let start = 0; 
    console.log('Form:', form);

    const formData = new FormData(form);
    formData.append('start', '0');
    const urlParams = new URLSearchParams(window.location.search);
    selectedCategory = urlParams.get('category');
    if (selectedCategory) {
        console.log('Selected category:', selectedCategory);
        formData.append('category', urlParams.get('category'));
        categorySelect.value = selectedCategory;
    }

    const params = new URLSearchParams(formData).toString();
    console.log(params);

    fetch(`../actions/action.getSellOrdersFilter.php?${params}`, { 
        method: 'GET' 
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
        console.log('Data received:', data);
    })
    .catch(error => console.error('Error:', error));



    form.addEventListener('change', function(event) {
        event.preventDefault();
                
        const formData = new FormData(form);
        formData.append('start', '0');
            
        // Convert form data to URL parameters
        const params = new URLSearchParams(formData).toString();
            
        fetch(`../actions/action.getSellOrdersFilter.php?${params}`, { // Append the parameters to the URL
            method: 'GET' // Change the method to GET
        })
        .then(response => response.json()
        .then(data => {
            displayResults(data, 0);
        }))
        .catch(error => console.error('Error:', error));
    });

});

function displayResults(data, start = 0) {

    const resultDiv = document.querySelector('.searchResult');

    resultDiv.innerHTML = '';

    // Check if there are no results
    if (data.length === 0) {
        resultDiv.innerHTML = '<p>No results found.</p>';
        return;
    }
    // Create and append a div for each item

    resultDiv.innerHTML = ``;
    let count  = 0;
    Object.values(data).forEach(item => {

        const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';

        if(item.wish == '0'){
            if(item.cart == '0'){ // not in wishlist or checkout
                resultDiv.innerHTML += `
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
                resultDiv.innerHTML += `
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
                resultDiv.innerHTML += `
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
                resultDiv.innerHTML += `
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
            resultDiv.innerHTML += `
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
    });
}


function addWishlist(val){

    params = {
        ID: val,
    }

    fetch('../actions/action.addWishlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.text()
                .then(t => {console.log(t)});
        })


}

function changePage(val) {
    const form = document.getElementById('searchForm');

    const formData = new FormData(form);
    formData.append('start', val);

    // Convert form data to URL parameters
    const params = new URLSearchParams(formData).toString();

    fetch(`../actions/action.getSellOrdersFilter.php?${params}`, { // Append the parameters to the URL
        method: 'GET' // Change the method to GET
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data);
        displayResults(data, val);
    })
    .catch(error => console.error('Error:', error));
}
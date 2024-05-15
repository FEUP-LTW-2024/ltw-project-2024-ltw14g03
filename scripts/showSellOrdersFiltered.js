
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('searchForm');
    categorySelect = document.getElementById('category');


    const resultDiv = document.querySelector('.searchResult');
    resultDiv.addEventListener("click", function(event) {
        const wishlistButton = event.target.closest(".wishlistButton");
        if (wishlistButton) {
            event.stopPropagation();
            addWishlist(wishlistButton.dataset.value);
        } else {
            const itemElement = event.target.closest(".item");
            if (itemElement) {
                selectSellOrder(itemElement.dataset.value);
            }
        }
    });

    let start = 0;

    const formData = new FormData(form);
    formData.append('start', '0');
    const urlParams = new URLSearchParams(window.location.search);
    selectedCategory = urlParams.get('category');
    if (selectedCategory) {
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
            console.log('Data received:', data);
            displayResults(data);
        }))
        .catch(error => console.error('Error:', error));
    });

});

function displayResults(data) {

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
        resultDiv.innerHTML += `

                    <div class = "item" data-value= "${item.item_id}" style = "animation-delay: ${count/8}s">

                        <img src = " ${item.images}" alt="Item Image">
                        
                        <div class = "desc">
                            <h3>${item.name}</h3>
                            <p style = "margin-top: 0.2em">"${item.description}"</p>
                            
                            <div style= "display: flex">
                                            <div class = "details">
                                                <p>Price: ${item.price}€</p>
                                                <p>Condition: ${item.condition_id}</p>
                                            </div>
                                            
                                <div class = "wishlistButton" data-value = '${item.item_id}'>
                                    <button type = "button">Wishlist</button>
                                </div>
                                            
                            </div>
                        </div>
                        
                        
                    </div>
                
            `; // Customize according to your data attributes and needs

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
        displayResults(data);
    })
    .catch(error => console.error('Error:', error));
}
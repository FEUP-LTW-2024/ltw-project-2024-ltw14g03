let fetchResults = null; // Declare fetchResults variable in the global scope

function updateFormData(form, categorySelect, startValue = '0') {
    const formData = new FormData(form);
    formData.append('start', startValue);
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category'); // Get selected category from URL parameters
    if (selectedCategory) {
        formData.append('category', selectedCategory);
        categorySelect.value = selectedCategory;
    }
    return new URLSearchParams(formData).toString();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const categorySelect = document.getElementById('category');
    const resultDiv = document.querySelector('.searchResult');
    let start = 0;

    fetchResults = (params) => {
        fetch(`../actions/action.getSellOrdersFilter.php?${params}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                displayResults(data, start);
                console.log('Data received:', data);
            })
            .catch(error => console.error('Error:', error));
    };

    const params = updateFormData(form, categorySelect);
    fetchResults(params);

    form.addEventListener('change', function(event) {
        event.preventDefault();
        const params = updateFormData(form, categorySelect);
        fetchResults(params);
    });

    function displayResults(data, start = 0) {
        resultDiv.innerHTML = '';

        if (data.length === 0) {
            resultDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        data.forEach((item, count) => {
            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg';
            const wishlistButton = item.wish == '1' ? `<button class="de-wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}" type="button">De-Wishlist</button>` : `<button class="wishlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Wishlist</button>`;
            const checkoutButton = item.cart == '1' ? `<button class="de-checkoutButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Remove from Cart</button>` : `<button class="checkoutlistButton" id="button${count}" data-value="${item.item_id}" data-page="${start}" data-ID="${count}">Add to Cart</button>`;
            
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

// Define changePage function in the global scope
function changePage(val) {
    console.log("Change page to: ", val);
    const form = document.getElementById('searchForm'); // Retrieve form element
    const categorySelect = document.getElementById('category'); // Retrieve category select element
    const params = updateFormData(form, categorySelect, val.toString()); // Generate updated params with new start value
    fetchResults(params); // Fetch results with updated params
}

function addWishlist(val) {
    fetch('../actions/action.addWishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: val }),
    })
    .then(response => response.text())
    .then(console.log)
    .catch(error => console.error('Error:', error));
}

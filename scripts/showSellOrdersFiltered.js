
document.addEventListener('DOMContentLoaded', function() {
<<<<<<< HEAD

    const form = document.getElementById('searchForm');

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
=======
    const categorySelect = document.getElementById('category');
    const resultDiv = document.querySelector('.searchResult');
    const form = document.getElementById('searchForm');
>>>>>>> main


<<<<<<< HEAD
        formData.append('start', '0');

        fetch('../actions/action.getSellOrdersFilter.php', { // Adjust the path to your actual PHP action file
            method: 'POST',
            body: formData
        })
=======
    function fetchAndDisplayResults() {
        const params = new URLSearchParams(new FormData(form)).toString();
        fetch(`/actions/action.getSellOrdersFilter.php?${params}`)
>>>>>>> main
            .then(response => response.json())
            .then(data => {
                displayResults(data);
                console.log('Data received:', data);
            })
            .catch(error => console.error('Error:', error));
<<<<<<< HEAD



    form.addEventListener('change', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        formData.append('start', '0');

        fetch('../actions/action.getSellOrdersFilter.php', { // Adjust the path to your actual PHP action file
            method: 'POST',
            body: formData
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

    const sel = document.getElementById('pageSelect');

    sel.innerHTML = ``;

    for(let i = 0; i < (data.n)/10; i++){

        sel.innerHTML += `
            <li><h2><a href = "#" onclick = "changePage(${i})">${i + 1}</a></h2></li>
        `;

    }

    // Clear previous results
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

function changePage(val){

    const form = document.getElementById('searchForm');

    const formData = new FormData(form);
    formData.append('start', val);

    fetch('../actions/action.getSellOrdersFilter.php', { // Adjust the path to your actual PHP action file
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data);
            displayResults(data);
        })
        .catch(error => console.error('Error:', error));

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
=======
    }

    function displayResults(data) {
        resultDiv.innerHTML = '';
        if (data.length === 0) {
            resultDiv.innerHTML = '<p>No results found.</p>';
            return;
        }
        let itemsHTML = '';
        data.forEach(item => {
            itemsHTML += `
                <div class="item">
                    <img src="${item.images}" alt="Item Image">
                    <div class="desc">
                        <h3>${item.name}</h3>
                        <p>"${item.description}"</p>
                        <div class="details">
                            <p>Price: ${item.price}€</p>
                            <p>Condition: ${item.condition_id}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        resultDiv.innerHTML = itemsHTML;
    }

    // Check for URL parameters to set initial category
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get('category');
    if (selectedCategory) {
        categorySelect.value = selectedCategory;
    }

    fetchAndDisplayResults(); // Fetch all or filtered results on page load

    form.addEventListener('change', function() {
        fetchAndDisplayResults(); // Fetch and display results based on form changes
    });
});
>>>>>>> main

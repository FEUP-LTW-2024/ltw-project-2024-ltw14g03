document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const resultDiv = document.querySelector('.searchResult');
    const form = document.getElementById('searchForm');


    function fetchAndDisplayResults() {
        const params = new URLSearchParams(new FormData(form)).toString();
        fetch(`/actions/action.getSellOrdersFilter.php?${params}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
                console.log('Data received:', data);
            })
            .catch(error => console.error('Error:', error));
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

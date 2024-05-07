document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const resultDiv = document.querySelector('.searchResult');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);

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
    });

    function displayResults(data) {
        // Clear previous results
        resultDiv.innerHTML = '';

        // Check if there are no results
        if (data.length === 0) {
            resultDiv.innerHTML = '<p>No results found.</p>';
            return;
        }
        // Create and append a div for each item
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item'; // Add a class for styling if necessary
            itemDiv.innerHTML = `
                <img src="${item.images}" alt="Item Image">
                <p>Price: $${item.price}</p>
                <p>Category: ${item.category_id} (ID)</p>
                <p>Condition: ${item.condition_id} (ID)</p>
                <p>Size: ${item.size_id} (ID)</p>
                <p>Description: ${item.description}</p>
            `; // Customize according to your data attributes and needs
            resultDiv.appendChild(itemDiv);
        });
    }
});

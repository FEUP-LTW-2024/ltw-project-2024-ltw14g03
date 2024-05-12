document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const resultDiv = document.querySelector('.searchResult');

    //Load when the page is opened
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

    form.addEventListener('change', function(event) {
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

        let itemsHTML = '';
        let count  = 0;
        data.forEach(item => {
            itemsHTML += `

                    <div class = "item" onclick = "selectSellOrder(this.dataset.value)" data-value= "${item.item_id}" style = "animation-delay: ${count/8}s">

                        <img src = " ${item.images}" alt="Item Image">
                        
                        <div class = "desc">
                            <h3>${item.name}</h3>
                            <p style = "margin-top: 0.2em">"${item.description}"</p>
                            
                            <div class = "details">
                                <p>Price: ${item.price}€</p>
                                <p>Condition: ${item.condition_id}</p>
                            </div>
                        </div>
                        
                    </div>
                
            `; // Customize according to your data attributes and needs

            count += 1;
        });
        resultDiv.innerHTML = itemsHTML;
    }
});

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
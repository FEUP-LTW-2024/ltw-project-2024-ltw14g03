
document.addEventListener('DOMContentLoaded', function() {

    console.log("lol");

    fetch('../actions/action.getSellOrders.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productList');
            let itemsHtml = '';
            data.forEach(item => {
                itemsHtml += `<div class="item" id = "items">
                            <img src="${item.image}" alt="Item Image">
                            <h3>Item Name</h3>
                            <p>${item.description}</p>
                            </div>`;
            });
            container.innerHTML = itemsHtml;
        })
        .catch(error => {
            alert('Error loading data: ' + error);
        });
});
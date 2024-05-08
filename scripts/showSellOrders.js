document.addEventListener('DOMContentLoaded', function() {

    console.log("lol");

    fetch('../actions/action.getSellOrders.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('productList');
            let itemsHtml = '';
            data.forEach(item => {
                const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg'; // Use default image if item.image is falsy
                itemsHtml += `<div class="item" id="items" data-product-id="${item.item_id}">
                            <img src="${imageSrc}" alt="Item Image">
                            <h3>Item Name</h3>
                            <p>${item.description}</p>
                            </div>`;
            });
            container.innerHTML = itemsHtml;

            // Add console log to track data
            console.log(data);
        })
        .catch(error => {
            alert('Error loading data: ' + error);
        });
});
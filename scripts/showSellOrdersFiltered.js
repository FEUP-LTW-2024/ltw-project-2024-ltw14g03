document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector("#searchForm");

    form.addEventListener("change", function(){

        fetch('../actions/action.getSellOrders.php')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('itemsFilter');
                let itemsHtml = '';
                data.forEach(item => {
                    itemsHtml += `<div class="item" id = "items">
                            <img src="https://via.placeholder.com/150" alt="Item Image">
                            <h3>Item Name</h3>
                            <p>${item.description}</p>
                            </div>`;
                });
                container.innerHTML = itemsHtml;
            })
            .catch(error => {
                alert('Error loading data: ' + error);
            });

    })

});
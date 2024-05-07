
if(document.URL.includes("index.php")){

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
                let count  = 0;
                data.forEach(item => {
                    const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg'; // Use default image if item.image is falsy
                    itemsHtml += `
                                <div class="item" id="items" data-product-id = "${item.item_id}" val = "${item.seller_id}" style = "animation-delay: ${count/8}s">
                                    <img src = " ${imageSrc}" alt="Item Image">
                                    <div class = "desc">
                                        <h3>${item.name}</h3>
                                        <p style = "margin-top: 0.2em">"${item.description}"</p>
                                        <div class = "details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>
                                    </div>
                                </div>
                    `;

                    count +=1;
                });
                container.innerHTML = itemsHtml;

                // Add console log to track data
                console.log(data);
            })
            .catch(error => {
                alert('Error loading data: ' + error);
            });
    });
}
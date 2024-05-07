
document.addEventListener('DOMContentLoaded', function() {

        let images;
        fetch('../actions/action.getSellOrderImages.php')
            .then(response => response.json())
            .then(data => {
                images = data
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });

        fetch('../actions/action.getSellOrders.php')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('productList');
                let itemsHtml = '';
                data.forEach(item => {

                    let img = "https://via.placeholder.com/150";

                    if(images !== undefined) {
                        images.forEach(image => {

                            if (image.item_id === item.item_id) {
                                img = image.image_url;
                            }
                        });
                    }


                    itemsHtml += `<div class="item" id = "items">
                                <img src= ${img} alt="Item Image">
                                <h3>Item Name</h3>
                                <p>${item.description}</p>
                                </div>`;
                }
                );
                container.innerHTML = itemsHtml;
            })
            .catch(error => {
                alert('Error loading data: ' + error);
            });

});
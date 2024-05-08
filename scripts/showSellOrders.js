document.addEventListener('DOMContentLoaded', function() {

<<<<<<< HEAD
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
=======
        let images;
        fetch('../actions/action.getSellOrderImages.php')
            .then(response => response.json())
            .then(data => {
                images = data

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

            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });


>>>>>>> 6685161391eab98c87d8cafd4a5da4230e1b152a
});
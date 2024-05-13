    document.addEventListener('DOMContentLoaded', function() {

        const main = document.getElementById("sell-order-show");

        const urlParams = new URLSearchParams(window.location.search);
        const jsonDataParam = urlParams.get('data');
        const jsonDataString = decodeURIComponent(jsonDataParam);
        const data = JSON.parse(jsonDataString);



        main.innerHTML = `
            
          
            <div class = "sell-order-seller" onclick = "showUser(this.dataset.value)" data-value = "${data.seller_id}">
            
                <h1 id="username">${data.name}</h1>
            </div>
            
            <div class = "sell-order-core">
            
                <div class = 'tags'>
                    <h3>Price: ${data.price}$</h3>
                    
                    <div class = "IDs">
                        <h3>${data.category_id} | ${data.brand_id} | ${data.size_id} | ${data.quality_id} </h3>
                    </div>
                </div>
                
                <img src="${data.image_src}">
                <h3>Details:<br>${data.description}</h3>
                <button onclick="addToWishlist(${data.ID})">Add to Wishlist</button>
            </div>
            
            <div class = "sell-order-seller" onclick = "showUser(this.dataset.value)" data-value = "${data.seller_id}">
            
                <div class = "seller">
                    <h3>Posted by ${data.seller_name}</h3>
                    <img src = "${data.seller_pfp}">
                </div>
            </div>
            
        `;



    });

    function addToWishlist(itemID) {
        const params = {
            ID: itemID,
        };
    
        fetch('../actions/action.addToWishlist.php', {
            method: 'POST',
            body: JSON.stringify(params),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add to wishlist');
            }
            return response.text();
        })
        .then(data => {
            // Do something after successfully adding to wishlist, if needed
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function showUser(userID){

        const params = {
            ID : userID,
        };

        fetch('../actions/action.getUser.php', {
            method: 'POST',
            body: JSON.stringify(params),
        })
            .then(response => {
                return response.json();
            })
            .then(data =>{
                window.location.href = `../pages/profileseller.php?data=${encodeURIComponent(JSON.stringify(data))}`;

            })

    }
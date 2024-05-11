    document.addEventListener('DOMContentLoaded', function() {

        const main = document.getElementById("sell-order-show");

        const urlParams = new URLSearchParams(window.location.search);
        const jsonDataParam = urlParams.get('data');
        const jsonDataString = decodeURIComponent(jsonDataParam);
        const data = JSON.parse(jsonDataString);



        main.innerHTML = `
            <h2 id="username">${data.name}</h2>
            
          
            <div class = "sell-order-seller" onclick = "showUser(this.dataset.value)" data-value = "${data.seller_id}">
                <img src = "${data.seller_pfp}">
                <p>User: ${data.seller_name}</p>
            </div>
           
            <p>User_ID: ${data.seller_id}</p>
            <img src="${data.image_src}">
            <p>Item Description: ${data.description}</p>
            <p>Price: ${data.price}</p>
        `;



    });

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
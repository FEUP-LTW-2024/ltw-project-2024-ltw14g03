    document.addEventListener('DOMContentLoaded', function() {

        const main = document.getElementById("sell-order-show");

        const urlParams = new URLSearchParams(window.location.search);
        const jsonDataParam = urlParams.get('data');
        const jsonDataString = decodeURIComponent(jsonDataParam);
        const data = JSON.parse(jsonDataString);



        main.innerHTML = `
        <h2 id="username">${data.name}</h2>
        <a href="/pages/profileseller.php?seller_id=${data.seller_id}">View Seller Profile</a>
        <p>User: ${data.username}</p>
        <p>User_ID: ${data.seller_id}</p>
        <img src="${data.image_src}">
        <p>Item Description: ${data.description}</p>
        <p>Price: ${data.price}</p>
    `;



    });
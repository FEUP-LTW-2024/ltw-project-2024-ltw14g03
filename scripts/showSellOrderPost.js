    document.addEventListener('DOMContentLoaded', function() {

        const main = document.getElementById("sell-order-show");

        const urlParams = new URLSearchParams(window.location.search);
        const jsonDataParam = urlParams.get('data');
        const jsonDataString = decodeURIComponent(jsonDataParam);
        const data = JSON.parse(jsonDataString);



                main.innerHTML = `
     
                    <h2 id="username">${data.name}</h2>
                    <img src = "${data.image_src}">
                
                `;



    });
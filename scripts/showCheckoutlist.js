
document.addEventListener('DOMContentLoaded', function() {

    const container = document.getElementById('productList');

    container.addEventListener("click", function(event) {
        const checkoutlistButton = event.target.closest(".de-checkoutlistButton");
        const clearCartButton = document.getElementById('clearCartButton');
        if (checkoutlistButton) {
            event.stopPropagation();
            removeCheckoutlist(checkoutlistButton.dataset.value);
        }
        else if (clearCartButton){
            event.stopPropagation();
            clearCart();
        } else {
            const itemElement = event.target.closest(".item");
            if (itemElement) {
                selectSellOrder(itemElement.dataset.value);
            }
        }
    });

    const params = {
        start : 0,
    };

    fetch('../actions/action.getCheckoutlist.php', {

        method: 'POST',
        body: JSON.stringify(params),

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            let count  = 0;
            data.forEach(item => {

                const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg'; // Use default image if item.image is falsy

                container.innerHTML += `
                            <div class="item" id = "item_${item.item_id}" data-value= "${item.item_id}" style = "animation-delay: ${count/8}s">
                                <img src = " ${imageSrc}" alt="Item Image">
                                <div class = "desc">
                                    <h3>${item.name}</h3>
                                    <p style = "margin-top: 0.2em">"${item.description}"</p>
                                    
                                    <div style= "display: flex">
                                        <div class = "details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>  
                                        <button class="de-checkoutlistButton" data-value="${item.item_id}">Remove from Cart</button>
                                    </div>
                                </div>
                            </div>
                `;

                count +=1;


            });

            // Add console log to track data
            console.log(data);
        })
        .catch(error => {
            alert('Error loading data: ' + error);
        });
});

function clearCart() {
    fetch('../actions/action.clearCheckoutlist.php', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cart has been cleared.');
            document.getElementById('productList').innerHTML = ''; // Clear the display
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

function removeCheckoutlist(val){
    params = {
        ID: val,
    }

    fetch('../actions/action.removeCheckoutlist.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
    .then(response => {
        return response.text()
            .then(t => {console.log(t)});
    })
}

function selectSellOrder(itemID) {

const params = {
    ID : itemID,
};

fetch('../actions/action.showSellOrder.php', {
    method: 'POST',
    body: JSON.stringify(params),
})
    .then(response => {
        return response.json();
    })
    .then(data =>{
        window.location.href = `../pages/sellOrder.php?data=${encodeURIComponent(JSON.stringify(data))}`;

    })


//your existing code goes here
}

function changePage(val){

param = {
    start: val,
}

fetch('../actions/action.getCheckoutlist.php', {

    method: 'POST',
    body: JSON.stringify(param),

})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        const container = document.getElementById('productList');
        container.innerHTML = ``;
        let count= 0;
        data.forEach(item => {

            const imageSrc = item.image ? item.image : '../assets/style/images/default_image.jpg'; // Use default image if item.image is falsy

            container.innerHTML += `
                            <div class="item" id = "item_${item.item_id}" data-value= "${item.item_id}" style = "animation-delay: ${count/8}s">
                                <img src = " ${imageSrc}" alt="Item Image">
                                <div class = "desc">
                                    <h3>${item.name}</h3>
                                    <p style = "margin-top: 0.2em">"${item.description}"</p>
                                    
                                    <div style="display: flex">
                                        <div class = "details">
                                            <p>Price: ${item.price}€</p>
                                            <p>Condition: ${item.condition_id}</p>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                `;

            count +=1;


        });


    })
    .catch(error => {
        alert('Error loading data: ' + error);
    });

}
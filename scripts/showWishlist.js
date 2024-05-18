document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productList');
    const start = 0;
    const params = { start };

    fetchData('../actions/action.getWishlist.php', params)
        .then(data => renderItems(container, data, start))
        .catch(error => alert('Error loading data: ' + error));
});

function fetchData(url, params) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    });
}

function renderItems(container, data, start) {
    let count = 0;
    container.innerHTML = '';

    data.forEach(item => {
        const imageSrc = item.image || '../assets/style/images/default_image.jpg';
        const itemHTML = generateItemHTML(item, imageSrc, count, start);
        container.insertAdjacentHTML('beforeend', itemHTML);
        count++;
    });

    console.log(data);
}

function generateItemHTML(item, imageSrc, count, start) {
    const { item_id, name, description, price, condition, category, brand, size, wish, cart } = item;
    const baseHTML = `
        <div class="item" id="item_${item_id}" data-value="${item_id}" style="animation-delay: ${count / 8}s;">
            <img src="${imageSrc}" alt="Item Image">
            <div class="desc">
                <h3>${name}</h3>
                <p style="margin-top: 0.2em">${description}</p>
                <div style="display: flex">
                    <div class="details">
                        <p>Price: ${price}€</p>
                        <p>Condition: ${condition.name}</p>
                        <p>Category: ${category.name}</p>
                        <p>Brand: ${brand.name}</p>
                        <p>Size: ${size.name}</p>
                    </div>
                    ${generateButtons(wish, cart, count, item_id, start)}
                </div>
            </div>
        </div>
    `;
    return baseHTML;
}

function generateButtons(wish, cart, count, item_id, start) {
    const buttons = [];
    if (wish === '0' && cart === '0') {
        buttons.push(
            `<div class="wishlist">
                <button class="wishlistButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">Wishlist</button>
            </div>`,
            `<div class="checkout">
                <button class="checkoutlistButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">Add to Cart</button>
            </div>`
        );
    } else if (wish === '0' && cart === '1') {
        buttons.push(
            `<div class="wishlist">
                <button class="wishlistButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">Wishlist</button>
            </div>`,
            `<div class="checkout">
                <button class="de-checkoutButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">Remove from Cart</button>
            </div>`
        );
    } else if (wish === '1' && cart === '0') {
        buttons.push(
            `<div class="wishlist">
                <button class="de-wishlistButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">De-Wishlist</button>
            </div>`,
            `<div class="checkout">
                <button class="checkoutlistButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">Add to Cart</button>
            </div>`
        );
    } else if (wish === '1' && cart === '1') {
        buttons.push(
            `<div class="wishlist">
                <button class="de-wishlistButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">De-Wishlist</button>
            </div>`,
            `<div class="checkout">
                <button class="de-checkoutButton" id="button${count}" data-value="${item_id}" data-page="${start}" data-ID="${count}">Remove from Cart</button>
            </div>`
        );
    }
    return buttons.join('');
}

function addWishlist(val) {
    const params = { ID: val };
    fetchData('../actions/action.addWishlist.php', params)
        .then(response => console.log(response))
        .catch(error => console.error('Error adding to wishlist:', error));
}

function selectSellOrder(itemID) {
    const params = { ID: itemID };
    fetchData('../actions/action.showSellOrder.php', params)
        .then(data => {
            window.location.href = `../pages/sellOrder.php?data=${encodeURIComponent(JSON.stringify(data))}`;
        })
        .catch(error => console.error('Error selecting sell order:', error));
}

function changePage(val) {
    const start = val;
    const params = { start };
    fetchData('../actions/action.getWishlist.php', params)
        .then(data => renderItems(document.getElementById('productList'), data, start))
        .catch(error => alert('Error loading data: ' + error));
}

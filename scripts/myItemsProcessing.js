async function fetchItemsProcessing(page) {
    console.log('Fetching items for page:', page);

    try {
        const response = await fetch('../actions/action.getMyItemsProcessing.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: page })
        });

        if (!response.ok) {
            throw new Error('Error fetching items: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Response data processing:', data);

        if (data.success && Array.isArray(data.items)) {
            displayItemsProcessing(data.items);
        } else {
            console.error('Invalid response data:', data);
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function displayItemsProcessing(items) {
    if (!Array.isArray(items)) {
        console.error('Items is not an array:', items);
        return;
    }

    const itemsDiv = document.getElementById('myItemsProcessing');
    itemsDiv.innerHTML = '';

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.setAttribute('data-value', item.item_id);
        itemElement.style.animationDelay = index / 8 + 's';

        const imgElement = document.createElement('img');
        imgElement.src = item.images;
        imgElement.alt = 'Item Image';

        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');

        const h3Element = document.createElement('h3');
        h3Element.textContent = item.name;

        const pElement = document.createElement('p');
        pElement.textContent = item.description;
        pElement.style.marginTop = '0.2em';

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        const priceP = document.createElement('p');
        priceP.textContent = 'Price: ' + item.price + '€';

        const conditionP = document.createElement('p');
        conditionP.textContent = 'Condition: ' + item.condition.name;

        const categoryP = document.createElement('p');
        categoryP.textContent = 'Category: ' + item.category.name;

        const brandP = document.createElement('p');
        brandP.textContent = 'Brand: ' + item.brand.name;

        const sizeP = document.createElement('p');
        sizeP.textContent = 'Size: ' + item.size.name;

        const shippingFormDiv = document.createElement('div');

        const shippingFormButton = document.createElement('button');
        shippingFormButton.classList.add('shippingForm');
        shippingFormButton.dataset.value = item.item_id;
        shippingFormButton.textContent = 'Shipping Form';
        shippingFormButton.addEventListener('click', () => {
            fetch('../actions/action.getShippingDetails.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: item.item_id })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    generateShippingForm(data.details);
                } else {
                    console.error('Failed to fetch shipping details:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });

        const finishSaleDiv = document.createElement('div');

        const finishSaleButton = document.createElement('button');
        finishSaleButton.classList.add('finishSale');
        finishSaleButton.dataset.value = item.item_id;
        finishSaleButton.textContent = "Finish Sale";
        finishSaleButton.addEventListener('click', () => {
            fetch('../actions/action.finishSale.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: item.item_id }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Item sale finished successfully!');
                    fetchItemsProcessing(0);

                    const itemElement = document.querySelector(`.item[data-value="${item.item_id}"]`);
                    itemElement.remove();

                    fetchItemsSold(0);
                } else {
                    console.log('Failed to finish sale: ' + data.error);
                }
            })
            .catch(error => console.log('Error:', error));
        });

        detailsDiv.appendChild(priceP);
        detailsDiv.appendChild(conditionP);
        detailsDiv.appendChild(categoryP);
        detailsDiv.appendChild(brandP);
        detailsDiv.appendChild(sizeP);

        descDiv.appendChild(h3Element);
        descDiv.appendChild(pElement);
        descDiv.appendChild(detailsDiv);

        itemElement.appendChild(imgElement);
        itemElement.appendChild(descDiv);

        shippingFormDiv.appendChild(shippingFormButton);
        itemElement.appendChild(shippingFormDiv);

        finishSaleDiv.appendChild(finishSaleButton);
        itemElement.appendChild(finishSaleDiv);

        itemsDiv.appendChild(itemElement);
    });
}

function generateShippingForm(details) {
    const content = `
        <div class="shipping-form">
            <h1 class="shipping-form-title">Shipping Form</h1>
            <h2 class="shipping-form-section-title">Item Details</h2>
            <p class="shipping-form-detail"><strong>Name:</strong> ${details.item.name}</p>
            <p class="shipping-form-detail"><strong>Description:</strong> ${details.item.description}</p>
            <p class="shipping-form-detail"><strong>Price:</strong> ${details.item.price}€</p>
            <p class="shipping-form-detail"><strong>Condition:</strong> ${details.item.condition.name}</p>
            <p class="shipping-form-detail"><strong>Category:</strong> ${details.item.category.name}</p>
            <p class="shipping-form-detail"><strong>Brand:</strong> ${details.item.brand.name}</p>
            <p class="shipping-form-detail"><strong>Size:</strong> ${details.item.size.name}</p>
            <h2 class="shipping-form-section-title">Buyer Details</h2>
            <p class="shipping-form-detail"><strong>Name:</strong> ${details.buyer.firstName} ${details.buyer.lastName}</p>
            <p class="shipping-form-detail"><strong>Email:</strong> ${details.buyer.email}</p>
            <p class="shipping-form-detail"><strong>Address:</strong> ${details.buyer.zip}</p>
        </div>
    `;

    const shippingFormContent = document.getElementById('shippingFormContent');
    shippingFormContent.innerHTML = content;

    const shippingFormContainer = document.getElementById('shippingFormContainer');
    shippingFormContainer.style.display = 'block';

    window.print();

    shippingFormContainer.style.display = 'none';
}
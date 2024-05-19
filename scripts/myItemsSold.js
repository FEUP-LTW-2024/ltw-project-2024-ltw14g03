async function fetchItemsSold(page) {

    console.log('Fetching items for page:', page);

    try {
        const response = await fetch('../actions/action.getMyItemsSold.php', {
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
        console.log('Response data:', data);

        if (data.success && Array.isArray(data.items)) {
            displayItemsSold(data.items);
        } else {
            console.error('Invalid response data:', data);
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}


function displayItemsSold(items) {
    console.log("Items: ",items);
    if (!Array.isArray(items)) {
        console.error('Items is not an array:', items);
        return;
    }

    const itemsDiv = document.getElementById('myItemsSold');
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

        detailsDiv.appendChild(priceP);
        detailsDiv.appendChild(conditionP);7
        detailsDiv.appendChild(categoryP);
        detailsDiv.appendChild(brandP);
        detailsDiv.appendChild(sizeP);

        descDiv.appendChild(h3Element);
        descDiv.appendChild(pElement);
        descDiv.appendChild(detailsDiv);


        itemElement.appendChild(imgElement);
        itemElement.appendChild(descDiv);


        itemsDiv.appendChild(itemElement);
    });
}

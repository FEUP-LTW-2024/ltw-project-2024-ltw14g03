document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const itemElement = event.target.closest('.item');
        if (itemElement) {
            const itemID = itemElement.getAttribute('data-value');
            selectSellOrder(itemID);
        }
    });
});


function selectSellOrder(itemID) {
    const params = {
        ID: itemID
    };

    fetch('../actions/action.showSellOrder.php', {
        method: 'POST',
        body: JSON.stringify(params),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        window.location.href = `../pages/sellOrder.php?data=${encodeURIComponent(JSON.stringify(data))}`;
    })
    .catch(error => {
        console.error('Error selecting sell order:', error);
    });
}

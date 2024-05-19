document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('body');

    container.addEventListener('click', function(event) {
        const button = event.target.closest('.category-button');
        if (!button) return;

        const categoryId = button.getAttribute('data-category-id');
        if (!categoryId) {
            console.error('Category ID is missing for this button:', button);
            return;
        }
        window.location.href = `browse.php?category=${categoryId}`;
        console.log('Category ID:', categoryId);
    });
});

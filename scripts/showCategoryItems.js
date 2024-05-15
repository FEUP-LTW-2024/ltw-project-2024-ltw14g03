document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('body'); // Or a more specific parent if applicable

    container.addEventListener('click', function(event) {
        const button = event.target.closest('.category-button'); // Finds the nearest ancestor which is a button
        if (!button) return; // Exit if the clicked element isn't a button or within a button

        const categoryId = button.getAttribute('data-category-id');
        if (!categoryId) {
            console.error('Category ID is missing for this button:', button);
            return; // Stop the function if the ID is not found
        }
        window.location.href = `browse.php?category=${categoryId}`;
        console.log('Category ID:', categoryId); // Confirm what's being clicked
    });
});

document.addEventListener("DOMContentLoaded", function() {

    const main = document.getElementById("imageInput");

    main.addEventListener('change', function(event) {

        const [file] = main.files

        document.getElementById("imageSell").src = URL.createObjectURL(file);
    });

});


document.addEventListener('DOMContentLoaded', function () {
    const titleElement = document.querySelector('h1');

    titleElement.addEventListener('mouseout', function () {
        titleElement.style.color = '';
    });

    titleElement.addEventListener('click', function () {
        window.location.href = '/';

    });
    // Get a reference to the logo image element
    const logoImage = document.getElementById('main-logo');

    // Add a click event listener to the logo image
    logoImage.addEventListener('click', () => {
        // Redirect to the homepage
        window.location.href = '/';
    });
});
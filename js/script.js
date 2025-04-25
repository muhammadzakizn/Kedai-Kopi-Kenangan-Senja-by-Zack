// Toggle class active

const navbarNav = document.querySelector(".navbar-nav");

// Ketika menu (logo Hamburger) di tekan

document.querySelector('#hamburger-menu').onclick = () => {navbarNav.classList.toggle('active')};

// Tekan di luar sidebar untuk menghilangkan menu navbar
const hamburger = document.querySelector('#hamburger-menu');
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});
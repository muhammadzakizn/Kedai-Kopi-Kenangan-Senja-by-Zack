// Toggle class active untuk Hamburger Menu

const navbarNav = document.querySelector(".navbar-nav");

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
    searchForm.classList.toggle("active");
    searchBox.focus();
    e.preventDefault();
}

// Ketika menu (logo Hamburger) di tekan

document.querySelector('#hamburger-menu').onclick = () => {navbarNav.classList.toggle('active')};

// Toogle class active untuk Shopping Cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector('#shopping-cart-button').onclick = (e) => { 
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};


// Tekan di luar sidebar untuk menghilangkan elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }

    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
});

// Klik tombol close untuk menutup modal
document.querySelector('.modal .close-icon').onclick = (e) => { 
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

// Klik di luar modal untuk menutup modal
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
};





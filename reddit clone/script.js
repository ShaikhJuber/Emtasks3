//// Scroll Button to fixed Navbar and change background color  //////

const navbar = document.querySelector('.navbar');
window.onscroll = () => {
    if (window.scrollY > 40) {
        navbar.classList.add('nav-active');
    } else {
        navbar.classList.remove('nav-active');
    }
};

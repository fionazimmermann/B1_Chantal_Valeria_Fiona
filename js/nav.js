const toggleNavigation = (element) => {
    document.getElementById("mobile-nav").classList.toggle("nav-visible");
}

document.getElementById("hamburger").addEventListener("click", toggleNavigation);
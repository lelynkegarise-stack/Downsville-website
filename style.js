// 1. The Navbar Loader
function loadNavbar() {
    fetch("./navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
            console.log("Navbar loaded into the DOM.");
            setupMobileMenu(); // Start the button logic ONLY after load
        })
        .catch(err => console.error("Failed to load navbar.html:", err));
}

// 2. The Button Logic
function setupMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
        hamburger.onclick = function() {
            console.log("Hamburger clicked!");
            menu.classList.toggle("active");
        };
    } else {
        console.error("Could not find hamburger or menu IDs in navbar.html");
    }
}

// Run the loader when the page opens
window.onload = loadNavbar;

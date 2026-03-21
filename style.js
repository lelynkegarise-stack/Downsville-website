// This simply loads the navbar into the <div id="navbar"></div>
fetch("./navbar.html")
  .then(response => {
    if (!response.ok) throw new Error("Navbar file not found");
    return response.text();
  })
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch(err => console.error("Error loading navbar:", err));

/* 2. The Button Logic
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
}*/



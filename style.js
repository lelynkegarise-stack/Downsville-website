fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch(err => console.error("Nav load error:", err));/* 2. The Button Logic
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



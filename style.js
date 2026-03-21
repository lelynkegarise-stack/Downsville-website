//fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // FIND THE BUTTONS AFTER THEY ARE LOADED
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
      hamburger.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevents the 'click' from closing the menu immediately
        menu.classList.toggle("active");
      });
    }

    // Handle the "About Us" dropdown on mobile
    document.querySelectorAll(".dropdown > a").forEach(link => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 950) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });
  })
  .catch(err => console.error("Error loading navbar:", err));

// Optional: Close menu if you click the main page
document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  if (menu && menu.classList.contains("active") && !menu.contains(e.target)) {
    menu.classList.remove("active");
  }
});

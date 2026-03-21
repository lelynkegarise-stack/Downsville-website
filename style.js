fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    // 1. Hamburger Toggle
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }

    // 2. Mobile Dropdown (About Us)
    document.querySelectorAll(".dropdown > a").forEach(link => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 950) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });

// 3. Search Toggle Fix
if (searchButton && searchBox) {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Toggle between none and inline-block
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "inline-block";
      searchBox.focus();
    } else {
      searchBox.style.display = "none";
    }
  });
}

// Calendar logic
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("month-toggle")) {
    const table = e.target.nextElementSibling;
    table.style.display = table.style.display === "table" ? "none" : "table";
  }
});

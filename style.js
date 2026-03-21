fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    // 1. Hamburger Toggle (Fixes the weird overlap)
    if (hamburger && menu) {
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
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

    // 3. Search Toggle
    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        const isHidden = searchBox.style.display === "none" || searchBox.style.display === "";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
      });
    }

    // Close menu if user clicks the page content
    document.addEventListener("click", () => {
      if (menu && menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    });
  })
  .catch(err => console.error("Nav load error:", err));

// Calendar Toggle
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("month-toggle")) {
    const table = e.target.nextElementSibling;
    table.style.display = table.style.display === "table" ? "none" : "table";
  }
});

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
document.querySelectorAll('.month-toggle').forEach(button => {
  button.addEventListener('click', () => {
    // Use querySelector to find the table in the same container
    const table = button.parentElement.querySelector('.month-table');
    if (!table) return;

    // Toggle visibility
    if (table.classList.contains('show')) {
      table.classList.remove('show');
    } else {
      table.classList.add('show');
    }
  });
});

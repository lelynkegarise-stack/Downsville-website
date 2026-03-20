fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Hamburger toggle
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
      });
    }

    // Search toggle
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");
    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        searchBox.style.display = searchBox.style.display === "inline-block" ? "none" : "inline-block";
        searchBox.focus();
      });
    }
  });

// ===== MONTH TABLE DROPDOWN =====
document.querySelectorAll(".month-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const table = button.nextElementSibling;
    table.style.display = table.style.display === "table" ? "none" : "table";
  });
});

// ===== REMOVE PAST EVENTS =====
const now = new Date();
document.querySelectorAll("tr[data-date]").forEach(row => {
  const eventDate = new Date(row.dataset.date);
  if (eventDate < now) row.remove();
});

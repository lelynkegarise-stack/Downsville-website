// ===== NAVBAR + HAMBURGER + SEARCH =====
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // --- Hamburger toggle for mobile ---
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        if (menu.style.display === "flex") {
          menu.style.display = "none";
        } else {
          menu.style.display = "flex";
        }
      });
    }

    // --- Load search script ---
    const script = document.createElement("script");
    script.src = "search.js";
    document.body.appendChild(script);
  });

// ===== MONTH TABLE DROPDOWN =====
document.querySelectorAll(".month-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const table = button.nextElementSibling;
    table.style.display = table.style.display === "table" ? "none" : "table";
  });
});

// ===== REMOVE PAST EVENTS =====
/*const now = new Date();

document.querySelectorAll("tr[data-date]").forEach(row => {
  const eventDate = new Date(row.dataset.date);
  if (eventDate < now) {
    row.remove();
  }
});*/



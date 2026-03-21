fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // ===== HAMBURGER TOGGLE =====
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.style.display =
          menu.style.display === "flex" ? "none" : "flex";
      });
    }

    // ===== MOBILE DROPDOWN TOGGLE =====
    document.querySelectorAll(".dropdown > a").forEach(link => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 600) {
          const parent = link.parentElement;

          if (!parent.classList.contains("open")) {
            e.preventDefault();

            // Close other dropdowns
            document.querySelectorAll(".dropdown").forEach(d => {
              d.classList.remove("open");
            });

            parent.classList.add("open");
          }
        }
      });
    });

    // ===== SEARCH TOGGLE (FIXED LOCATION) =====
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        if (searchBox.style.display === "inline-block") {
          searchBox.style.display = "none";
        } else {
          searchBox.style.display = "inline-block";
          searchBox.focus();
        }
      });
    }
  })
  .catch(error => console.error("Navbar load error:", error));


// ===== MONTH TABLE DROPDOWN =====
document.querySelectorAll(".month-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const table = button.nextElementSibling;
    table.style.display =
      table.style.display === "table" ? "none" : "table";
  });
});


// ===== REMOVE PAST EVENTS =====
const now = new Date();
document.querySelectorAll("tr[data-date]").forEach(row => {
  const eventDate = new Date(row.dataset.date);
  if (eventDate < now) {
    row.remove();
  }
});

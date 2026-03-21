// ===== 1. NAVBAR & SEARCH LOAD =====
fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // FIND BUTTONS (Supports both IDs and Classes)
    const hamburger = document.getElementById("hamburger") || document.querySelector(".hamburger");
    const menu = document.getElementById("menu") || document.querySelector(".menu");
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    // ===== HAMBURGER TOGGLE =====
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
        
        // Safety: If JS is forcing styles, ensure it toggles correctly
        if (menu.classList.contains("active")) {
          menu.style.display = "flex";
        } else {
          menu.style.display = "none";
        }
      });
    }

    // ===== MOBILE DROPDOWN TOGGLE (for About Us/History) =====
    document.querySelectorAll(".dropdown > a").forEach(link => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 950) { // Catch landscape phones
          const parent = link.parentElement;
          if (!parent.classList.contains("open")) {
            e.preventDefault();
            // Close other open dropdowns
            document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
            parent.classList.add("open");
          }
        }
      });
    });

    // ===== SEARCH BOX TOGGLE =====
    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        const isHidden = searchBox.style.display === "none" || searchBox.style.display === "";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
      });
    }
  })
  .catch(error => console.error("Navbar failed to load:", error));


// ===== 2. CALENDAR TABLE TOGGLE =====
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("month-toggle")) {
    const table = e.target.nextElementSibling;
    if (table) {
      table.style.display = table.style.display === "table" ? "none" : "table";
    }
  }
});


// ===== 3. AUTO-REMOVE PAST EVENTS =====
// We run this on a slight delay to make sure tables are loaded
setTimeout(() => {
  const now = new Date();
  document.querySelectorAll("tr[data-date]").forEach(row => {
    const eventDate = new Date(row.dataset.date);
    if (eventDate < now) {
      row.remove();
    }
  });
}, 500);

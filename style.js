fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    // 1. Hamburger Toggle (Keep this)
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }

    // 2. Mobile Dropdown (Keep this)
    document.querySelectorAll(".dropdown > a").forEach(link => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 950) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });

    // 3. Search Toggle (Keep this)
    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        const isHidden = searchBox.style.display === "none";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
      });

      // ==========================================
      // 4. NEW SMART SEARCH LOGIC (Put it here!)
      // ==========================================
      searchBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = searchBox.value.toLowerCase().trim();
          if (!query) return;

          // Check which page we are on
          const isEventsPage = window.location.pathname.includes("upcoming-events.html") || 
                               window.location.pathname.includes("calendar.html");

          if (isEventsPage) {
            // If on the events page, just filter the months visible on screen
            const months = document.querySelectorAll(".month");
            months.forEach(month => {
              const text = month.innerText.toLowerCase();
              month.style.display = text.includes(query) ? "block" : "none";
            });
          } else {
            // If on any other page, look at the pages.json file
          fetch("pages.json")
              .then(res => res.json())
              .then(pages => {
                const match = pages.find(p => 
                  p.title.toLowerCase().includes(query) || 
                  p.content.toLowerCase().includes(query)
                );

                if (match) {
                  window.location.href = match.url;
                } else {
                  alert("No results found for '" + query + "'");
                }
              })
              .catch(err => console.error("JSON Search Error:", err));
          }
        }
      });
      // ==========================================
    }
  })
  .catch(err => console.error("Nav load error:", err));
// ----------------------------
//  CALENDAR TOGGLE
// ----------------------------
function initEvents() {
    const container = document.getElementById("months-container");
    if (!container) return;

    // 1. SORTING LOGIC (Moves 2027 to the bottom)
    const months = Array.from(container.querySelectorAll(".month"));
    
    months.sort((a, b) => {
        const aDate = a.getAttribute('data-month') || "";
        const bDate = b.getAttribute('data-month') || "";
        return aDate.localeCompare(bDate);
    });

    // Physically move them in the browser's memory
    months.forEach(month => container.appendChild(month));

    // 2. CLICK LOGIC (Matches your CSS .show class)
    container.onclick = function(e) {
        if (e.target.classList.contains("month-toggle")) {
            // Find the table that is right next to the button
            const table = e.target.nextElementSibling;
            
            if (table) {
                // This adds/removes the "show" class you have in your CSS
                table.classList.toggle("show");
            }
        }
    };
}

// Run the script when everything is loaded
window.addEventListener("load", initEvents);
// Backup run in case the page is already ready
initEvents();

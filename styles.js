fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    const navElement = document.getElementById("navbar");
    if (navElement) {
      navElement.innerHTML = data;
    }

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

    // 2. Search Toggle (Button Click)
    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        // Use getComputedStyle to check visibility reliably
        const isHidden = window.getComputedStyle(searchBox).display === "none";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
      });

      // 3. Search Logic (Enter Key)
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchBox.value.toLowerCase().trim();
        if (!query) {
            // Reset: Show all months if search is empty
            document.querySelectorAll(".month").forEach(m => m.style.display = "block");
            return;
        }

        const isEventsPage = window.location.href.includes("calendar.html");

        if (isEventsPage) {
            const months = document.querySelectorAll(".month");
            let foundOnPage = false;

            months.forEach(month => {
                const text = month.innerText.toLowerCase();
                if (text.includes(query)) {
                    month.style.display = "block";
                    foundOnPage = true;
                    // Automatically open the table so they can see the result
                    const table = month.querySelector(".month-table");
                    if (table) table.classList.add("show");
                } else {
                    month.style.display = "none";
                }
            });

            // CRITICAL FIX: If "Rentals" wasn't found on this page, search the site-wide JSON
            if (!foundOnPage) {
                searchInJSON(query);
            }
        } else {
            // Not on calendar? Go straight to JSON search
            searchInJSON(query);
        }
    }
});

// Helper function to handle the Redirect
function searchInJSON(query) {
    fetch("./pages.json")
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
                // Reset calendar so it's not a blank screen if no results anywhere
                document.querySelectorAll(".month").forEach(m => m.style.display = "block");
            }
        })
        .catch(err => console.error("Error loading pages.json:", err));
}
// CALENDAR LOGIC (Runs independently)
function initEvents() {
    const container = document.getElementById("months-container");
    if (!container) return;

    const months = Array.from(container.querySelectorAll(".month"));
    months.sort((a, b) => {
        const aDate = a.getAttribute('data-month') || "";
        const bDate = b.getAttribute('data-month') || "";
        return aDate.localeCompare(bDate);
    });
    months.forEach(month => container.appendChild(month));

    container.onclick = function(e) {
        if (e.target.classList.contains("month-toggle")) {
            const table = e.target.nextElementSibling;
            if (table) table.classList.toggle("show");
        }
    };
}

window.addEventListener("load", initEvents);
initEvents();

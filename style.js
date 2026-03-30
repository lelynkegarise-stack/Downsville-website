// Function to initialize search AFTER navbar loads
function setupSearch() {
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    if (!searchButton || !searchBox) return;

    // Toggle Visibility
    searchButton.onclick = () => {
        const isHidden = window.getComputedStyle(searchBox).display === "none";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
    };

    // Search Logic
    searchBox.onkeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            const query = searchBox.value.toLowerCase().trim();
            if (!query) return;

            const isEventsPage = window.location.pathname.includes("calendar.html");
            let localMatches = 0;

            if (isEventsPage) {
                const months = document.querySelectorAll(".month");
                months.forEach(month => {
                    const text = month.innerText.toLowerCase();
                    if (text.includes(query)) {
                        month.style.display = "block";
                        localMatches++;
                    } else {
                        month.style.display = "none";
                    }
                });
            }

            // If we aren't on the calendar OR we found nothing locally
            if (!isEventsPage || localMatches === 0) {
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
                            alert("No results found for: " + query);
                            // Reset calendar so it isn't blank
                            if (isEventsPage) {
                                document.querySelectorAll(".month").forEach(m => m.style.display = "block");
                            }
                        }
                    })
                    .catch(err => console.error("Search Error:", err));
            }
        }
    };
}

// 1. Fetch Navbar and then run setup
fetch("./navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        setupSearch(); 
        
        const hamburger = document.getElementById("hamburger");
        const menu = document.getElementById("menu");

        // Main Mobile Menu Toggle
        if (hamburger && menu) {
            hamburger.onclick = () => menu.classList.toggle("active");
        }

        // Dropdown Toggle for Mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dd => {
            const link = dd.querySelector('a'); 

            link.addEventListener('click', function(e) {
                // If the screen is smaller than 950px (your CSS breakpoint)
                if (window.innerWidth <= 950) { 
                    e.preventDefault(); // Stop it from going to index.html
                    dd.classList.toggle('open'); // This triggers your CSS rule
                }
            });
        });
    });

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

// ----------------------------
// navbar
// ----------------------------
function initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return false; 

    const hamburger = nav.querySelector('.hamburger');
    const menu = nav.querySelector('.menu');
    const searchButton = nav.querySelector('#searchButton');
    const searchBox = nav.querySelector('#searchBox');

    // 1. Mobile Hamburger Toggle
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        nav.querySelectorAll('.dropdown > a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 950) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('open');
                }
            });
        });
    }

    // 2. Search Logic (Moved inside to ensure IDs exist)
    if (searchButton && searchBox) {
        searchButton.addEventListener('click', function() {
            if (searchBox.style.display === 'none' || searchBox.style.display === '') {
                searchBox.style.display = 'inline-block';
                searchBox.focus();
            } else if (searchBox.value.trim() !== "") {
                applySearchFilter(searchBox.value);
            } else {
                searchBox.style.display = 'none';
            }
        });

        searchBox.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                applySearchFilter(this.value);
            }
        });
    }

    return true; // Tells the interval to stop retrying
} // <--- THIS WAS THE MISSING BRACKET

function applySearchFilter(query) {
    const term = query.toLowerCase().trim();
    const months = document.querySelectorAll('.month');

    months.forEach(month => {
        const content = month.innerText.toLowerCase();
        if (content.includes(term)) {
            month.style.display = 'block';
        } else {
            month.style.display = 'none';
        }
    });
}

// Retry logic to handle the fetch delay
const interval = setInterval(() => {
    if (initNavbar()) {
        clearInterval(interval);
        console.log("Navbar and Search initialized!");
    }
}, 100);
// ----------------------------
//  CALENDAR TOGGLE
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("months-container");
    
    if (!container) return; // Safety check

    // 1. Sorting Logic
    const months = Array.from(container.querySelectorAll(".month"));
    months.sort((a, b) => new Date(a.dataset.month) - new Date(b.dataset.month));
    months.forEach(month => container.appendChild(month));

    // 2. Click Logic (Dropdown)
    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("month-toggle")) {
            const table = e.target.nextElementSibling;
            if (table) {
                // Toggles between hidden and visible
                table.style.display = (table.style.display === "table") ? "none" : "table";
            }
        }
    });
});

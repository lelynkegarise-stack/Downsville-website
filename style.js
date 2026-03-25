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
document.addEventListener('click', function (e) {
    // Check if we clicked the search button OR the magnifying glass icon inside it
    if (e.target.id === 'searchButton' || e.target.closest('#searchButton')) {
        const box = document.getElementById('searchBox');
        if (!box) return;

        // Toggle visibility
        if (box.style.display === 'none' || box.style.display === '') {
            box.style.display = 'inline-block';
            box.focus();
        } else if (box.value.trim() !== "") {
            executeCalendarSearch(box.value);
        } else {
            box.style.display = 'none';
        }
    }
});

// 2. Listen for ENTER key inside the search box
document.addEventListener('keydown', function (e) {
    if (e.target.id === 'searchBox' && e.key === 'Enter') {
        executeCalendarSearch(e.target.value);
    }
});

// 3. The Search Function
function executeCalendarSearch(query) {
    const term = query.toLowerCase().trim();
    const months = document.querySelectorAll('.month');

    months.forEach(month => {
        const content = month.innerText.toLowerCase();
        // If the month contains the search word, show it. Otherwise, hide it.
        month.style.display = content.includes(term) ? 'block' : 'none';
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

// ----------------------------
// 1. NAVBAR INITIALIZATION
// ----------------------------
function initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return false; 

    const hamburger = nav.querySelector('.hamburger');
    const menu = nav.querySelector('.menu');
    const searchButton = nav.querySelector('#searchButton');
    const searchBox = nav.querySelector('#searchBox');

    // Mobile Hamburger Toggle
    if (hamburger && menu) {
        hamburger.onclick = () => {
            menu.classList.toggle('active');
        };

        nav.querySelectorAll('.dropdown > a').forEach(link => {
            link.onclick = (e) => {
                if (window.innerWidth <= 950) {
                    e.preventDefault();
                    link.parentElement.classList.toggle('open');
                }
            };
        });
    }

    // Search Bar Logic
    if (searchButton && searchBox) {
        searchButton.onclick = () => {
            if (searchBox.style.display === 'none' || searchBox.style.display === '') {
                searchBox.style.display = 'inline-block';
                searchBox.focus();
            } else if (searchBox.value.trim() !== "") {
                executeCalendarSearch(searchBox.value);
            } else {
                searchBox.style.display = 'none';
            }
        };

        searchBox.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeCalendarSearch(searchBox.value);
            }
        };
    }

    return true; // Tells the interval the navbar is ready
}

// ----------------------------
// 2. SEARCH FUNCTION
// ----------------------------
function executeCalendarSearch(query) {
    const term = query.toLowerCase().trim();
    const months = document.querySelectorAll('.month');

    console.log("Searching for:", term);

    months.forEach(month => {
        const content = month.innerText.toLowerCase();
        
        if (content.includes(term)) {
            month.style.display = 'block';
            const table = month.querySelector('table');
            if (table && term !== "") {
                table.style.display = "table";
            }
        } else {
            month.style.display = 'none';
        }
    });

    if (term === "") {
        months.forEach(m => m.style.display = 'block');
    }
}

// ----------------------------
// 3. RETRY INTERVAL (Brings navbar back)
// ----------------------------
const navInterval = setInterval(() => {
    if (initNavbar()) {
        clearInterval(navInterval);
        console.log("Navbar and Search initialized!");
    }
}, 100);

// ----------------------------
// 4. CALENDAR TOGGLE (Dropdowns)
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("months-container");
    if (!container) return;

    // Sorting Logic
    const monthsArray = Array.from(container.querySelectorAll(".month"));
    monthsArray.sort((a, b) => new Date(a.dataset.month) - new Date(b.dataset.month));
    monthsArray.forEach(month => container.appendChild(month));

    // Click Logic for the Month Toggles
    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("month-toggle")) {
            const table = e.target.nextElementSibling;
            if (table) {
                table.style.display = (table.style.display === "table") ? "none" : "table";
            }
        }
    });
});}

    /// 3. The New Search Function (The one you just wrote)
function executeCalendarSearch(query) {
    const term = query.toLowerCase().trim();
    const months = document.querySelectorAll('.month');

    console.log("Searching for:", term);

    months.forEach(month => {
        const content = month.innerText.toLowerCase();
        
        if (content.includes(term)) {
            month.style.display = 'block';
            
            // Automatically opens the table if a match is found
            const table = month.querySelector('table');
            if (table && term !== "") {
                table.style.display = "table";
            }
        } else {
            month.style.display = 'none';
        }
    });

    // Reset if search is empty
    if (term === "") {
        months.forEach(m => m.style.display = 'block');
    }
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

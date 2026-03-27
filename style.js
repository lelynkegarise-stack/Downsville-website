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
    if (!container) return;

    // 1. Target only the divs with the class 'month'
    const monthsArray = Array.from(container.querySelectorAll(".month"));

    // 2. Enhanced Sorting Logic
    monthsArray.sort((a, b) => {
        // .trim() removes any accidental hidden spaces
        const dateA = a.dataset.month ? a.dataset.month.trim() : "";
        const dateB = b.dataset.month ? b.dataset.month.trim() : "";

        // Log to console so you can see if the values are being read correctly
        console.log(`Comparing ${dateA} to ${dateB}`);

        return dateA.localeCompare(dateB);
    });

    // 3. Re-attach them to the container
    // This physically moves them in the DOM
    monthsArray.forEach(month => {
        container.appendChild(month);
    });
});

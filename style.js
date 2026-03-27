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
const initEventsPage = () => {
    const container = document.getElementById("months-container");
    if (!container) return;

    // 1. Grab everything currently inside the container
    const title = container.querySelector("h1");
    const monthsArray = Array.from(container.querySelectorAll(".month"));

    // 2. Sort the array (2026 will come before 2027)
    monthsArray.sort((a, b) => {
        const dateA = a.getAttribute('data-month') || "";
        const dateB = b.getAttribute('data-month') || "";
        return dateA.localeCompare(dateB);
    });

    // 3. Clear the container and put them back in the NEW order
    container.innerHTML = "";
    if (title) container.appendChild(title);
    
    monthsArray.forEach(month => {
        container.appendChild(month);
        
        // 4. Re-hide the tables immediately after putting them back
        const table = month.querySelector(".month-table");
        if (table) {
            table.style.display = "none";
        }
    });

    // 5. CLICK LOGIC (Event Delegation)
    // We attach the listener to the 'document' so it never "forgets" the buttons
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("month-toggle")) {
            // Find the table that is right next to the button we clicked
            const table = e.target.nextElementSibling;
            
            if (table) {
                const isHidden = table.style.display === "none" || getComputedStyle(table).display === "none";
                table.style.display = isHidden ? "table" : "none";
            }
        }
    });
};

// Run everything when the page is fully loaded
window.addEventListener("load", initEventsPage);

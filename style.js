// ----------------------------
// NAVBAR
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
      link.addEventListener('click', function(e){
        if (window.innerWidth <= 950) {
          e.preventDefault();
          this.parentElement.classList.toggle('open');
        }
      });
    });
  }

document.addEventListener('click', function (e) {
    // If they clicked the search icon
    if (e.target.id === 'searchButton') {
        const box = document.getElementById('searchBox');
        if (!box) return;

        // Toggle visibility
        if (box.style.display === 'none' || box.style.display === '') {
            box.style.display = 'inline-block';
            box.focus();
        } else if (box.value.trim() !== "") {
            // If it's already open and has text, search!
            applySearchFilter(box.value);
        } else {
            box.style.display = 'none';
        }
    }
});

document.addEventListener('keydown', function (e) {
    // If they press Enter while typing in the search box
    if (e.target.id === 'searchBox' && e.key === 'Enter') {
        applySearchFilter(e.target.value);
    }
});

function applySearchFilter(query) {
    const term = query.toLowerCase().trim();
    const months = document.querySelectorAll('.month');

    months.forEach(month => {
        // Look at all the text inside the month (Name + Table Rows)
        const content = month.innerText.toLowerCase();
        
        if (content.includes(term)) {
            month.style.display = 'block';
        } else {
            month.style.display = 'none';
        }
    });
}
// Your existing retry logic remains the same
if (!initNavbar()) {
  const interval = setInterval(() => {
    if (initNavbar()) clearInterval(interval);
  }, 100);
}


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

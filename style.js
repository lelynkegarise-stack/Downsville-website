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

// 1. Listen for ALL clicks on the page
document.addEventListener('click', function (e) {
  // Check if we clicked the search button
  if (e.target && e.target.id === 'searchButton') {
    const searchBox = document.getElementById('searchBox');
    if (!searchBox) return;

    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
      searchBox.style.display = 'inline-block';
      searchBox.focus();
    } else {
      // If box is open and has text, search. Otherwise, hide it.
      if (searchBox.value.trim() !== "") {
        executeSearch(searchBox.value);
      } else {
        searchBox.style.display = 'none';
      }
    }
  }
});

// 2. Listen for the "Enter" key globally
document.addEventListener('keypress', function (e) {
  if (e.target && e.target.id === 'searchBox') {
    if (e.key === 'Enter') {
      executeSearch(e.target.value);
    }
  }
});

// 2. The Search Logic
function executeSearch(query) {
  const term = query.toLowerCase().trim();
  console.log("Searching for:", term);

  // We look for the months. 
  // IMPORTANT: Make sure your month divs actually have the class "month"
  const months = document.querySelectorAll('.month');
  
  if (months.length === 0) {
    console.error("No elements with class 'month' found on this page.");
    return;
  }

  months.forEach(month => {
    const text = month.innerText.toLowerCase();
    if (text.includes(term)) {
      month.style.display = 'block'; // Show match
    } else {
      month.style.display = 'none'; // Hide non-match
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

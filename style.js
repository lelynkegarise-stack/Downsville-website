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

  // 2. SEARCH LOGIC (Add this part!)
  if (searchButton && searchBox) {
    searchButton.addEventListener('click', () => {
      if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'inline-block';
        searchBox.focus(); // Jump cursor into the box
      } else {
        // Perform search if there is text, otherwise hide it
        if (searchBox.value.trim() !== "") {
          handleSearch(searchBox.value);
        } else {
          searchBox.style.display = 'none';
        }
      }
    });

    // Handle pressing "Enter" in the search box
    searchBox.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch(searchBox.value);
      }
    });
  }

  return true;
}

// Helper function to actually run the search
function handleSearch(query) {
  console.log("Searching for:", query);
  const term = query.toLowerCase().trim();
  
  // Example: Filter the calendar months
  const months = document.querySelectorAll('.month');
  months.forEach(month => {
    const text = month.innerText.toLowerCase();
    month.style.display = text.includes(term) ? 'block' : 'none';
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

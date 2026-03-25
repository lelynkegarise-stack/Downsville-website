// ----------------------------
// NAVBAR
// ----------------------------
function initNavbar() {
  const nav = document.querySelector('nav');
  if (!nav) return false;

  const hamburger = nav.querySelector('.hamburger');
  const menu = nav.querySelector('.menu');

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

  return true;
}
// 1. Listen for the Click on the search button (using delegation)
document.addEventListener('click', (e) => {
    // Check if the clicked element is the search button
    if (e.target && e.target.id === 'searchButton') {
        const searchBox = document.getElementById('searchBox');
        
        if (searchBox.style.display === 'none' || searchBox.style.display === '') {
            searchBox.style.display = 'inline-block';
            searchBox.focus(); // Put the cursor in the box immediately
        } else {
            // If it's already open and has text, run the search
            if (searchBox.value.trim() !== "") {
                runMySearch(searchBox.value);
            } else {
                searchBox.style.display = 'none';
            }
        }
    }
});

// 2. Listen for the "Enter" key inside the search box
document.addEventListener('keypress', (e) => {
    if (e.target && e.target.id === 'searchBox') {
        if (e.key === 'Enter') {
            runMySearch(e.target.value);
        }
    }
});

// 3. The function that actually does the work
function runMySearch(query) {
    const searchTerm = query.toLowerCase().trim();
    console.log("Searching for:", searchTerm);

    // This part filters your calendar months automatically
    const months = document.querySelectorAll('.month');
    let foundAny = false;

    months.forEach(month => {
        const text = month.innerText.toLowerCase();
        if (text.includes(searchTerm)) {
            month.style.display = 'block';
            foundAny = true;
        } else {
            month.style.display = 'none';
        }
    });

    if (!foundAny) {
        alert("No events found for: " + query);
    }
}

// Retry every 100ms in case navbar is dynamically loaded
if (!initNavbar()) {
  const interval = setInterval(() => {
    if (initNavbar()) clearInterval(interval);
  }, 100);
}

// ----------------------------
// search bar
// ----------------------------

    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        const isHidden = searchBox.style.display === "none";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
      });
    }
  })
  .catch(err => console.error("Nav load error:", err));

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

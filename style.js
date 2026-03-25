// ----------------------------
// 1️⃣ NAVBAR (optional)
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

// Retry every 100ms in case navbar is dynamically loaded
if (!initNavbar()) {
  const interval = setInterval(() => {
    if (initNavbar()) clearInterval(interval);
  }, 100);
}

// ----------------------------
// 2️⃣ CALENDAR TOGGLE
// ----------------------------
function initCalendar() {
  const container = document.getElementById("months-container");
  if (!container) return;

  // 1. Sort the months first
  const months = Array.from(container.querySelectorAll(".month"));
  months.sort((a, b) => {
    const dateA = new Date(a.getAttribute('data-month'));
    const dateB = new Date(b.getAttribute('data-month'));
    return dateA - dateB;
  });
  
  // Re-append them in order
  months.forEach(month => container.appendChild(month));

  // 2. Single click listener for the whole container (Better Performance)
  container.addEventListener("click", (e) => {
    // Check if what we clicked was a toggle button
    if (e.target.classList.contains("month-toggle")) {
      const button = e.target;
      const table = button.nextElementSibling;
      
      if (table) {
        // This toggles the 'show' class we defined in your CSS
        table.classList.toggle("show");
      }
    }
  });
}

// Ensure it runs after the DOM is fully ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCalendar);
} else {
  initCalendar();
}

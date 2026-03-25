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
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("months-container");
  
  if (!container) {
    console.error("Could not find the months-container div!");
    return;
  }

  // 1. Setup the Click Listener
  container.addEventListener("click", (e) => {
    // Check if the clicked element is the button
    if (e.target.classList.contains("month-toggle")) {
      console.log("Button clicked:", e.target.innerText);
      
      const table = e.target.nextElementSibling;
      if (table) {
        table.classList.toggle("show");
      }
    }
  });

  // 2. Sort the Months (Optional but helpful)
  const months = Array.from(container.querySelectorAll(".month"));
  months.sort((a, b) => {
    return new Date(a.dataset.month) - new Date(b.dataset.month);
  });
  months.forEach(month => container.appendChild(month));
});

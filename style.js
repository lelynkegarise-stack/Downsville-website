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
  const months = Array.from(document.querySelectorAll(".month"));

  // 1. Sort months first
  months.sort((a, b) => {
    return new Date(a.dataset.month) - new Date(b.dataset.month);
  });
  months.forEach(month => container.appendChild(month));

  // 2. Add toggle logic to the buttons
  document.querySelectorAll(".month-toggle").forEach(button => {
    button.addEventListener("click", function() {
      // Find the table that is right after this button
      const table = this.nextElementSibling;
      if (table) {
        table.classList.toggle("show");
      }
    });
  });
});

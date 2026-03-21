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
  document.querySelectorAll(".month-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const table = button.nextElementSibling;
      if (table) table.classList.toggle("show");
    });
  });

  // Optional: sort months by data-month
  const container = document.getElementById("months-container");
  if (container) {
    const months = Array.from(container.querySelectorAll(".month"));
    months.sort((a, b) => {
      const dateA = new Date(a.dataset.month);
      const dateB = new Date(b.dataset.month);
      return dateA - dateB;
    });
    months.forEach(month => container.appendChild(month));
  }
}

// Run calendar code when page fully loads
window.addEventListener("load", () => {
  initCalendar();
});

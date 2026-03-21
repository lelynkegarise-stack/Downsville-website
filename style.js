document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------
  // 1️⃣ HAMBURGER & MOBILE DROPDOWNS
  // ----------------------------
  function initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return false;

    const hamburger = nav.querySelector('.hamburger');
    const menu = nav.querySelector('.menu');

    if (hamburger && menu) {
      // Hamburger toggle
      hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
      });

      // Mobile dropdown toggle
      nav.querySelectorAll('.dropdown > a').forEach(link => {
        link.addEventListener('click', function(e){
          if (window.innerWidth <= 950) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
          }
        });
      });
    }

    return true; // Navbar initialized
  }

  // Try to initialize immediately, else retry if navbar is loaded dynamically
  if (!initNavbar()) {
    const navbarInterval = setInterval(() => {
      if (initNavbar()) clearInterval(navbarInterval);
    }, 100);
  }

  // ----------------------------
  // 2️⃣ MONTH CALENDAR TOGGLE
  // ----------------------------
  document.querySelectorAll(".month-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const table = button.nextElementSibling;
      if (table) table.classList.toggle("show");
    });
  });

  // ----------------------------
  // 3️⃣ OPTIONAL: SORT MONTHS
  // ----------------------------
  const container = document.getElementById("months-container");
  if (container) {
    const months = Array.from(document.querySelectorAll(".month"));
    months.sort((a,b) => new Date(a.dataset.month) - new Date(b.dataset.month));
    months.forEach(month => container.appendChild(month));
  }

});

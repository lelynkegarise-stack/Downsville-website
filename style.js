document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------
  // 1️⃣ HAMBURGER & MOBILE DROPDOWNS
  // ----------------------------
  function initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return false; // Navbar not loaded yet

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

  // Retry every 100ms if navbar is loaded dynamically
  if (!initNavbar()) {
    const interval = setInterval(() => {
      if (initNavbar()) clearInterval(interval);
    }, 100);
  }

  // ----------------------------
  // 2️⃣ MONTH TABLE TOGGLE
  // ----------------------------
  document.querySelectorAll('.month-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const table = button.nextElementSibling; // the table immediately after the button
      if (table) table.classList.toggle('show'); // toggle the 'show' class
    });
  });

});

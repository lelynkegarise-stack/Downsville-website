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

  // Toggle month tables
  const monthButtons = document.querySelectorAll(".month-toggle");

  monthButtons.forEach(button => {
    button.addEventListener("click", () => {
      const table = button.nextElementSibling; // get the table right after the button
      if (table) {
        table.classList.toggle("show"); // toggle the 'show' class
      }
    });
  });

  // Optional: sort months if you use data-month attributes
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

});

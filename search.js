// ===== LOAD NAVBAR =====
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // ===== HAMBURGER =====
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.style.display =
          menu.style.display === "flex" ? "none" : "flex";
      });
    }

    // ===== MOBILE DROPDOWN =====
    document.querySelectorAll('.dropbtn').forEach(button => {
      button.addEventListener('click', (e) => {
        if (window.innerWidth <= 600) {
          e.preventDefault();
          const dropdown = button.nextElementSibling;
          dropdown.style.display =
            dropdown.style.display === 'block' ? 'none' : 'block';
        }
      });
    });

    // ===== SEARCH SETUP =====
    const searchBox = document.getElementById('searchBox');
    const resultsDiv = document.getElementById('results');
    const searchButton = document.getElementById('searchButton');

    if (!searchBox || !resultsDiv || !searchButton) return;

    searchBox.style.display = 'none';
    resultsDiv.style.display = 'none';

    function highlight(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function runSearch() {
      const query = searchBox.value.trim().toLowerCase();
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';

      if (query === '') return;

      let matchesFound = false;

      pages.forEach(page => {
        const titleLower = page.title.toLowerCase();
        const contentLower = page.content.toLowerCase();

        if (titleLower.includes(query) || contentLower.includes(query)) {
          const highlightedTitle = highlight(page.title, query);
          const highlightedContent = highlight(page.content, query);

          resultsDiv.innerHTML += `
            <p>
              <a href="${page.url}">${highlightedTitle}</a> - ${highlightedContent}
            </p>
          `;
          matchesFound = true;
        }
      });

      if (!matchesFound) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
      }

      resultsDiv.style.display = 'block';
    }

    // ===== SEARCH BUTTON =====
    searchButton.addEventListener('click', () => {
      if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'inline-block';
        searchBox.focus();
      } else {
        runSearch();
      }
    });

    // ===== ENTER KEY =====
    searchBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runSearch();
    });
  })
  .catch(error => console.error("Navbar load error:", error));


// ===== LOAD SEARCH DATA =====
let pages = [];

fetch('pages.json')
  .then(response => response.json())
  .then(data => pages = data)
  .catch(err => console.error("Failed to load pages.json:", err));

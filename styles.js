fetch("./navbar.html")
  .then(response => response.text())
  .then(data => {
    const navElement = document.getElementById("navbar");
    if (navElement) {
      navElement.innerHTML = data;
    }

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    // 1. Hamburger Toggle
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }

    // 2. Search Toggle (Button Click)
    if (searchButton && searchBox) {
      searchButton.addEventListener("click", () => {
        // Use getComputedStyle to check visibility reliably
        const isHidden = window.getComputedStyle(searchBox).display === "none";
        searchBox.style.display = isHidden ? "inline-block" : "none";
        if (isHidden) searchBox.focus();
      });

      // 3. Search Logic (Enter Key)
     searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchBox.value.toLowerCase().trim();
        if (!query) return;

        console.log("Searching for:", query); // Check your F12 console for this!

        fetch("./pages.json")
            .then(res => res.json())
            .then(pages => {
                // We search both Title and Content, and make sure both are lowercase
                const match = pages.find(p => {
                    const titleMatch = p.title.toLowerCase().includes(query);
                    const contentMatch = p.content.toLowerCase().includes(query);
                    return titleMatch || contentMatch;
                });

                if (match) {
                    console.log("Found match:", match.title);
                    window.location.href = match.url;
                } else {
                    console.warn("No match found in JSON for:", query);
                    alert("No results found for '" + query + "'");
                }
            })
            .catch(err => {
                console.error("Could not load pages.json. Check the file name!");
                alert("Search error: Make sure pages.json exists in your folder.");
            });
    }
});
// CALENDAR LOGIC (Runs independently)
function initEvents() {
    const container = document.getElementById("months-container");
    if (!container) return;

    const months = Array.from(container.querySelectorAll(".month"));
    months.sort((a, b) => {
        const aDate = a.getAttribute('data-month') || "";
        const bDate = b.getAttribute('data-month') || "";
        return aDate.localeCompare(bDate);
    });
    months.forEach(month => container.appendChild(month));

    container.onclick = function(e) {
        if (e.target.classList.contains("month-toggle")) {
            const table = e.target.nextElementSibling;
            if (table) table.classList.toggle("show");
        }
    };
}

window.addEventListener("load", initEvents);
initEvents();

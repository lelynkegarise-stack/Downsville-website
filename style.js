// 1. FETCH THE NAVBAR
fetch("./navbar.html")
  .then(response => {
    if (!response.ok) throw new Error("Navbar file not found");
    return response.text();
  })
  .then(data => {
    // 2. PUT THE HTML ON THE PAGE
    const navContainer = document.getElementById("navbar");
    if (navContainer) {
      navContainer.innerHTML = data;
    }

    // 3. NOW FIND THE BUTTONS (Only after they are on the page!)
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    console.log("Hamburger found:", hamburger); // This will show in your browser 'Inspect' tool
    console.log("Menu found:", menu);

    if (hamburger && menu) {
      hamburger.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Hamburger clicked!");
        menu.classList.toggle("active");
      });
    }

    // 4. MOBILE DROPDOWN (About Us)
    const dropdownLinks = document.querySelectorAll(".dropdown > a");
    dropdownLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 950) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });

    // 5. SEARCH BOX TOGGLE
    const searchBtn = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");
    if (searchBtn && searchBox) {
      searchBtn.addEventListener("click", () => {
        searchBox.style.display = (searchBox.style.display === "none") ? "inline-block" : "none";
        if (searchBox.style.display === "inline-block") searchBox.focus();
      });
    }
  })
  .catch(err => console.error("Error loading navbar:", err));

// 6. CLOSE MENU IF YOU CLICK OUTSIDE
document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");
  if (menu && menu.classList.contains("active") && !menu.contains(e.target) && e.target !== hamburger) {
    menu.classList.remove("active");
  }
});

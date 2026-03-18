
// Dropdown
document.querySelectorAll(".month-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const table = button.nextElementSibling;
    table.style.display = table.style.display === "table" ? "none" : "table";
  });
});

// Remove past events
const now = new Date();

document.querySelectorAll("tr[data-date]").forEach(row => {
  const eventDate = new Date(row.dataset.date);

  if (eventDate < now) {
    row.remove();
  }
});


let pages = [];

fetch('pages.json')
  .then(response => response.json())
  .then(data => pages = data)
  .catch(err => console.error("Failed to load pages.json:", err));

const searchBox = document.getElementById('searchBox');
const resultsDiv = document.getElementById('results');
const searchButton = document.getElementById('searchButton');

function highlight(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function runSearch() {
    const query = searchBox.value.trim().toLowerCase();
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';

    if(query === '') return;

    let matchesFound = false;

    pages.forEach(page => {
        const titleLower = page.title.toLowerCase();
        const contentLower = page.content.toLowerCase();

        if(titleLower.includes(query) || contentLower.includes(query)) {
            const highlightedTitle = highlight(page.title, query);
            const highlightedContent = highlight(page.content, query);
            resultsDiv.innerHTML += `<p><a href="${page.url}">${highlightedTitle}</a> - ${highlightedContent}</p>`;
            matchesFound = true;
        }
    });

    if(!matchesFound) resultsDiv.innerHTML = '<p>No results found.</p>';

    resultsDiv.style.display = 'block';
}

// Toggle input visibility when clicking the magnifying glass
searchButton.addEventListener('click', () => {
    if(searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'inline-block';
        searchBox.focus();
    } else {
        runSearch();
    }
});

searchBox.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') runSearch();
});

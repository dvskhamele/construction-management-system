
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
    let glossary = [];

    fetch('glossary.json')
        .then(response => response.json())
        .then(data => {
            glossary = data.terms;
            displayResults(glossary);
        });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTerms = glossary.filter(item => item.term.toLowerCase().includes(searchTerm) || item.definition.toLowerCase().includes(searchTerm));
        displayResults(filteredTerms);
    });

    function displayResults(terms) {
        resultsDiv.innerHTML = '';
        terms.forEach(item => {
            const termDiv = document.createElement('div');
            termDiv.className = 'term';

            const termTitle = document.createElement('h2');
            termTitle.textContent = item.term;

            const termDef = document.createElement('p');
            termDef.textContent = item.definition;

            termDiv.appendChild(termTitle);
            termDiv.appendChild(termDef);
            resultsDiv.appendChild(termDiv);
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const checklistContainer = document.getElementById('checklist-container');
    const clearButton = document.getElementById('clear-checklist');
    let checklistItems = [];

    // Load checklist items from JSON
    fetch('checklist.json')
        .then(response => response.json())
        .then(data => {
            checklistItems = data;
            renderChecklist();
        });

    function renderChecklist() {
        checklistContainer.innerHTML = '';
        chrome.storage.sync.get(null, (items) => {
            checklistItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'checklist-item';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.id;
                checkbox.checked = items[item.id] || false; // Load saved state

                const label = document.createElement('label');
                label.htmlFor = item.id;
                label.textContent = item.text;

                checkbox.addEventListener('change', (event) => {
                    chrome.storage.sync.set({ [item.id]: event.target.checked });
                });

                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(label);
                checklistContainer.appendChild(itemDiv);
            });
        });
    }

    clearButton.addEventListener('click', () => {
        chrome.storage.sync.clear(() => {
            renderChecklist(); // Re-render to show all unchecked
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const safetyChecklistForm = document.getElementById('safety-checklist-form');
    const resultsDiv = document.getElementById('results');

    // Load saved state from local storage
    function loadChecklistState() {
        const savedState = JSON.parse(localStorage.getItem('constructionSafetyChecklist'));
        if (savedState) {
            for (const id in savedState) {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = savedState[id];
                }
            }
        }
    }

    // Save current state to local storage
    safetyChecklistForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const currentState = {};
        const checkboxes = safetyChecklistForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            currentState[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('constructionSafetyChecklist', JSON.stringify(currentState));
        resultsDiv.innerHTML = '<p>Checklist state saved successfully!</p>';
        setTimeout(() => {
            resultsDiv.innerHTML = '';
        }, 3000);
    });

    loadChecklistState();
});

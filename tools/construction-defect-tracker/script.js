
document.addEventListener('DOMContentLoaded', function() {
    const defectForm = document.getElementById('defect-form');
    const defectList = document.getElementById('defect-list');
    let defects = JSON.parse(localStorage.getItem('constructionDefects')) || [];

    function renderDefects() {
        defectList.innerHTML = '';
        defects.forEach((defect, index) => {
            const listItem = document.createElement('li');
            listItem.className = defect.resolved ? 'resolved' : '';
            listItem.innerHTML = `
                <div class="defect-details">
                    <span><strong>Description:</strong> ${defect.description}</span>
                    <span><strong>Location:</strong> ${defect.location}</span>
                    <span><strong>Severity:</strong> ${defect.severity}</span>
                </div>
                <button class="resolve-btn" data-index="${index}">${defect.resolved ? 'Unresolve' : 'Resolve'}</button>
            `;
            defectList.appendChild(listItem);
        });
    }

    function addDefect(description, location, severity) {
        defects.push({ description, location, severity, resolved: false });
        localStorage.setItem('constructionDefects', JSON.stringify(defects));
        renderDefects();
    }

    function toggleResolveDefect(index) {
        defects[index].resolved = !defects[index].resolved;
        localStorage.setItem('constructionDefects', JSON.stringify(defects));
        renderDefects();
    }

    defectForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const description = document.getElementById('defect-description').value;
        const location = document.getElementById('defect-location').value;
        const severity = document.getElementById('defect-severity').value;
        addDefect(description, location, severity);
        defectForm.reset();
    });

    defectList.addEventListener('click', function(event) {
        if (event.target.classList.contains('resolve-btn')) {
            const index = parseInt(event.target.dataset.index);
            toggleResolveDefect(index);
        }
    });

    renderDefects();
});

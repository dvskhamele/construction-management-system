
document.addEventListener('DOMContentLoaded', function() {
    const phaseForm = document.getElementById('phase-form');
    const timelineDisplay = document.getElementById('timeline-display');
    let phases = JSON.parse(localStorage.getItem('projectPhases')) || [];

    function renderPhases() {
        timelineDisplay.innerHTML = '';
        // Sort phases by start date
        phases.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        phases.forEach(phase => {
            const phaseItem = document.createElement('div');
            phaseItem.classList.add('phase-item');

            const startDate = new Date(phase.startDate);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + phase.duration);

            phaseItem.innerHTML = `
                <strong>${phase.name}</strong><br>
                Start: ${startDate.toDateString()}<br>
                End: ${endDate.toDateString()} (${phase.duration} days)
            `;
            timelineDisplay.appendChild(phaseItem);
        });
    }

    phaseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('phase-name').value;
        const duration = parseFloat(document.getElementById('phase-duration').value);
        const startDate = document.getElementById('start-date').value;

        if (isNaN(duration) || duration <= 0 || !name || !startDate) {
            alert("Please enter valid phase details.");
            return;
        }

        phases.push({ name, duration, startDate });
        localStorage.setItem('projectPhases', JSON.stringify(phases));
        renderPhases();
        phaseForm.reset();
    });

    renderPhases();
});

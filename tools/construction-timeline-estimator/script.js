
document.getElementById('timeline-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const phase1Duration = parseFloat(document.getElementById('phase1-duration').value);
    const phase2Duration = parseFloat(document.getElementById('phase2-duration').value);
    const phase3Duration = parseFloat(document.getElementById('phase3-duration').value);
    const phase4Duration = parseFloat(document.getElementById('phase4-duration').value);
    const phase5Duration = parseFloat(document.getElementById('phase5-duration').value);

    if (isNaN(phase1Duration) || isNaN(phase2Duration) || isNaN(phase3Duration) || isNaN(phase4Duration) || isNaN(phase5Duration)) {
        alert("Please enter valid numbers for all phase durations.");
        return;
    }

    const totalDuration = phase1Duration + phase2Duration + phase3Duration + phase4Duration + phase5Duration;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Estimated Project Duration: ${totalDuration.toFixed(0)} days</p>
        <p class="note">Note: This is a simplified estimate. Actual project timelines can be affected by many factors including resource availability, weather, and unforeseen issues.</p>
    `;
});

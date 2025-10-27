
document.getElementById('roof-pitch-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const rise = parseFloat(document.getElementById('rise').value);
    const run = parseFloat(document.getElementById('run').value);

    if (isNaN(rise) || isNaN(run) || run === 0) {
        alert("Please enter valid numbers for rise and run. Run cannot be zero.");
        return;
    }

    // Calculate pitch as a ratio (e.g., X/12)
    const pitchRatio = (rise / run) * 12;

    // Calculate angle in degrees
    const angleRadians = Math.atan(rise / run);
    const angleDegrees = angleRadians * (180 / Math.PI);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Roof Pitch: ${pitchRatio.toFixed(2)} / 12</p>
        <p>Roof Angle: ${angleDegrees.toFixed(2)} degrees</p>
    `;
});

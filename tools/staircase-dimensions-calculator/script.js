document.getElementById('staircase-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const totalRise = parseFloat(document.getElementById('total-rise').value);
    const desiredRiserHeight = parseFloat(document.getElementById('desired-riser-height').value);
    const desiredTreadDepth = parseFloat(document.getElementById('desired-tread-depth').value);

    if (isNaN(totalRise) || isNaN(desiredRiserHeight) || isNaN(desiredTreadDepth)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate number of risers
    const numRisers = Math.round(totalRise / desiredRiserHeight);
    const actualRiserHeight = totalRise / numRisers;

    // Calculate number of treads (always one less than risers)
    const numTreads = numRisers - 1;
    const totalRun = numTreads * desiredTreadDepth;

    let warnings = [];

    // Common building code guidelines (example values, can vary by region)
    const maxRiserHeight = 7.75; // inches
    const minTreadDepth = 10;    // inches
    const minRiserHeight = 4;    // inches

    if (actualRiserHeight > maxRiserHeight) {
        warnings.push(`Warning: Riser height (${actualRiserHeight.toFixed(2)} inches) exceeds common maximum of ${maxRiserHeight} inches.`);
    }
    if (actualRiserHeight < minRiserHeight) {
        warnings.push(`Warning: Riser height (${actualRiserHeight.toFixed(2)} inches) is less than common minimum of ${minRiserHeight} inches.`);
    }
    if (desiredTreadDepth < minTreadDepth) {
        warnings.push(`Warning: Tread depth (${desiredTreadDepth.toFixed(2)} inches) is less than common minimum of ${minTreadDepth} inches.`);
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Rise: ${totalRise.toFixed(2)} inches</p>
        <p>Number of Risers: ${numRisers}</p>
        <p>Actual Riser Height: ${actualRiserHeight.toFixed(2)} inches</p>
        <p>Number of Treads: ${numTreads}</p>
        <p>Actual Tread Depth: ${desiredTreadDepth.toFixed(2)} inches</p>
        <p>Total Run (horizontal distance): ${totalRun.toFixed(2)} inches</p>
        ${warnings.length > 0 ? '<div class="warnings">' + warnings.join('<br>') + '</div>' : ''}
        <p class="note">Note: Always consult local building codes for exact requirements.</p>
    `;
});
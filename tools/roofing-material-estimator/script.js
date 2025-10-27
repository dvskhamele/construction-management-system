document.getElementById('roofing-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roofLength = parseFloat(document.getElementById('roof-length').value);
    const roofWidth = parseFloat(document.getElementById('roof-width').value);
    const roofPitchRise = parseFloat(document.getElementById('roof-pitch-rise').value);
    const shingleCoverage = parseFloat(document.getElementById('shingle-coverage').value);
    const wastePercentage = parseFloat(document.getElementById('waste-percentage').value);

    if (isNaN(roofLength) || isNaN(roofWidth) || isNaN(roofPitchRise) || isNaN(shingleCoverage) || isNaN(wastePercentage)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate pitch factor
    const pitchFactor = Math.sqrt( (12 * 12) + (roofPitchRise * roofPitchRise) ) / 12;

    // Calculate total roof area (assuming a simple gable roof)
    const flatArea = roofLength * roofWidth;
    const totalRoofArea = flatArea * pitchFactor;

    // Calculate shingle bundles needed, including waste
    const bundlesNeeded = (totalRoofArea * (1 + (wastePercentage / 100))) / shingleCoverage;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Roof Area: ${totalRoofArea.toFixed(2)} sq ft</p>
        <p>Estimated Shingle Bundles Needed: ${Math.ceil(bundlesNeeded)}</p>
        <p class="note">Note: This estimate is for a simple gable roof and does not account for complex rooflines, valleys, hips, or specific shingle types. Always consult manufacturer specifications and local building codes.</p>
    `;
});
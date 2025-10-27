
document.getElementById('rebar-footing-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const footingLength = parseFloat(document.getElementById('footing-length').value);
    const footingWidth = parseFloat(document.getElementById('footing-width').value);
    const footingDepth = parseFloat(document.getElementById('footing-depth').value);
    const rebarSizeWeight = parseFloat(document.getElementById('rebar-size').value);
    const rebarSpacing = parseFloat(document.getElementById('rebar-spacing').value);

    if (isNaN(footingLength) || isNaN(footingWidth) || isNaN(footingDepth) || isNaN(rebarSizeWeight) || isNaN(rebarSpacing) || footingLength <= 0 || footingWidth <= 0 || footingDepth <= 0 || rebarSpacing <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Assuming rebar is placed in both directions at the bottom of the footing
    // and a standard concrete cover (e.g., 3 inches)
    const concreteCover = 3; // inches

    // Calculate effective width and length for rebar placement (subtracting cover from both sides)
    const effectiveWidthInches = (footingWidth * 12) - (2 * concreteCover);
    const effectiveLengthInches = (footingLength * 12) - (2 * concreteCover);

    // Number of bars in the length direction (across the width of the footing)
    const numBarsLengthDirection = Math.floor(effectiveWidthInches / rebarSpacing) + 1;

    // Number of bars in the width direction (across the length of the footing)
    const numBarsWidthDirection = Math.floor(effectiveLengthInches / rebarSpacing) + 1;

    // Total length of rebar for main bars (simplified, assuming full length bars)
    const totalLengthMainBars = (numBarsLengthDirection * footingLength) + (numBarsWidthDirection * footingWidth);

    // Total weight of rebar
    const totalWeightRebar = totalLengthMainBars * rebarSizeWeight;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Total Length of Rebar: ${totalLengthMainBars.toFixed(2)} feet</p>
        <p>Estimated Total Weight of Rebar: ${totalWeightRebar.toFixed(2)} lbs</p>
        <p class="note">Note: This estimate is for main longitudinal bars in a rectangular footing and does not account for stirrups/ties, bends, laps, or waste. Always consult structural drawings and local codes.</p>
    `;
});

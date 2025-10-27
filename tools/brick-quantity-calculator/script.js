
document.getElementById('brick-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const wallLength = parseFloat(document.getElementById('wall-length').value);
    const wallHeight = parseFloat(document.getElementById('wall-height').value);
    const brickLength = parseFloat(document.getElementById('brick-length').value);
    const brickHeight = parseFloat(document.getElementById('brick-height').value);
    const mortarThickness = parseFloat(document.getElementById('mortar-thickness').value);

    if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(brickLength) || isNaN(brickHeight) || isNaN(mortarThickness)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate wall area in square feet
    const wallArea = wallLength * wallHeight;

    // Calculate effective brick dimensions including mortar
    const effectiveBrickLength = brickLength + mortarThickness; // inches
    const effectiveBrickHeight = brickHeight + mortarThickness; // inches

    // Convert effective brick dimensions to feet
    const effectiveBrickLengthFt = effectiveBrickLength / 12;
    const effectiveBrickHeightFt = effectiveBrickHeight / 12;

    // Calculate effective area of one brick in square feet
    const effectiveBrickArea = effectiveBrickLengthFt * effectiveBrickHeightFt;

    // Calculate number of bricks needed
    const bricksNeeded = Math.ceil(wallArea / effectiveBrickArea);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Wall Area: ${wallArea.toFixed(2)} sq ft</p>
        <p>Estimated Bricks Needed: ${bricksNeeded}</p>
        <p class="note">Note: This estimate does not account for waste, openings (windows/doors), or complex wall designs.</p>
    `;
});

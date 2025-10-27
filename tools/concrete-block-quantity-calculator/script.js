
document.getElementById('block-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const wallLength = parseFloat(document.getElementById('wall-length').value);
    const wallHeight = parseFloat(document.getElementById('wall-height').value);
    const blockLength = parseFloat(document.getElementById('block-length').value);
    const blockHeight = parseFloat(document.getElementById('block-height').value);
    const mortarThickness = parseFloat(document.getElementById('mortar-thickness').value);

    if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(blockLength) || isNaN(blockHeight) || isNaN(mortarThickness) || wallLength <= 0 || wallHeight <= 0 || blockLength <= 0 || blockHeight <= 0 || mortarThickness < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Calculate wall area in square feet
    const wallArea = wallLength * wallHeight;

    // Calculate effective block dimensions including mortar
    const effectiveBlockLength = blockLength + mortarThickness; // inches
    const effectiveBlockHeight = blockHeight + mortarThickness; // inches

    // Convert effective block dimensions to feet
    const effectiveBlockLengthFt = effectiveBlockLength / 12;
    const effectiveBlockHeightFt = effectiveBlockHeight / 12;

    // Calculate effective area of one block in square feet
    const effectiveBlockArea = effectiveBlockLengthFt * effectiveBlockHeightFt;

    // Calculate number of blocks needed
    const blocksNeeded = Math.ceil(wallArea / effectiveBlockArea);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Wall Area: ${wallArea.toFixed(2)} sq ft</p>
        <p>Estimated Concrete Blocks Needed: ${blocksNeeded}</p>
        <p class="note">Note: This estimate does not account for waste, openings (windows/doors), or complex wall designs.</p>
    `;
});

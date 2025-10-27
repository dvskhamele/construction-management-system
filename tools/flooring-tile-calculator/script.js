
document.getElementById('flooring-tile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomLength = parseFloat(document.getElementById('room-length').value);
    const roomWidth = parseFloat(document.getElementById('room-width').value);
    const tileLength = parseFloat(document.getElementById('tile-length').value);
    const tileWidth = parseFloat(document.getElementById('tile-width').value);
    const wastePercentage = parseFloat(document.getElementById('waste-percentage').value);

    if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(tileLength) || isNaN(tileWidth) || isNaN(wastePercentage)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate room area in square feet
    const roomArea = roomLength * roomWidth;

    // Convert tile dimensions from inches to feet
    const tileLengthFt = tileLength / 12;
    const tileWidthFt = tileWidth / 12;

    // Calculate area of one tile in square feet
    const tileArea = tileLengthFt * tileWidthFt;

    // Calculate number of tiles needed without waste
    const tilesNeededRaw = roomArea / tileArea;

    // Add waste percentage
    const tilesNeededWithWaste = tilesNeededRaw * (1 + (wastePercentage / 100));

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Room Area: ${roomArea.toFixed(2)} sq ft</p>
        <p>Estimated Tiles Needed (including ${wastePercentage}% waste): ${Math.ceil(tilesNeededWithWaste)}</p>
        <p class="note">Note: This estimate is for square or rectangular tiles and rooms. Complex layouts may require more waste.</p>
    `;
});

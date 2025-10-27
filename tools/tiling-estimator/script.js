document.getElementById('tiling-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const areaToTile = parseFloat(document.getElementById('area-to-tile').value);
    const tileLength = parseFloat(document.getElementById('tile-length').value);
    const tileWidth = parseFloat(document.getElementById('tile-width').value);
    const groutGap = parseFloat(document.getElementById('grout-gap').value);
    const wastePercentage = parseFloat(document.getElementById('waste-percentage').value);

    if (isNaN(areaToTile) || isNaN(tileLength) || isNaN(tileWidth) || isNaN(groutGap) || isNaN(wastePercentage) || areaToTile <= 0 || tileLength <= 0 || tileWidth <= 0 || groutGap < 0 || wastePercentage < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Calculate effective tile dimensions including grout gap
    const effectiveTileLength = tileLength + groutGap; // inches
    const effectiveTileWidth = tileWidth + groutGap;   // inches

    // Convert effective tile dimensions to feet
    const effectiveTileLengthFt = effectiveTileLength / 12;
    const effectiveTileWidthFt = effectiveTileWidth / 12;

    // Calculate effective area of one tile in square feet
    const effectiveTileArea = effectiveTileLengthFt * effectiveTileWidthFt;

    // Calculate number of tiles needed without waste
    const tilesNeededRaw = areaToTile / effectiveTileArea;

    // Add waste percentage
    const tilesNeededWithWaste = tilesNeededRaw * (1 + (wastePercentage / 100));

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Area to Tile: ${areaToTile.toFixed(2)} sq ft</p>
        <p>Estimated Tiles Needed (including ${wastePercentage}% waste): ${Math.ceil(tilesNeededWithWaste)}</p>
        <p class="note">Note: This estimate is for square or rectangular tiles and areas. Complex layouts may require more waste. Always consult product specifications.</p>
    `;
});
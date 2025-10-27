
document.getElementById('flooring-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomLength = parseFloat(document.getElementById('room-length').value);
    const roomWidth = parseFloat(document.getElementById('room-width').value);
    const materialWidth = parseFloat(document.getElementById('material-width').value);
    const wastePercentage = parseFloat(document.getElementById('waste-percentage').value);

    if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(materialWidth) || isNaN(wastePercentage) || roomLength <= 0 || roomWidth <= 0 || materialWidth <= 0 || wastePercentage < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const totalRoomArea = roomLength * roomWidth;
    const materialNeededSqFt = totalRoomArea * (1 + (wastePercentage / 100));

    // Convert material width from inches to feet
    const materialWidthFt = materialWidth / 12;

    let linearFeetMaterial = 0;
    if (materialWidthFt > 0) {
        linearFeetMaterial = materialNeededSqFt / materialWidthFt;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Room Area: ${totalRoomArea.toFixed(2)} sq ft</p>
        <p>Total Material Needed (including ${wastePercentage}% waste): ${materialNeededSqFt.toFixed(2)} sq ft</p>
        <p>Estimated Linear Feet of Material: ${linearFeetMaterial.toFixed(2)} linear feet</p>
        <p class="note">Note: This estimate is for rectangular rooms and materials. Complex layouts may require more waste. Always consult product specifications.</p>
    `;
});

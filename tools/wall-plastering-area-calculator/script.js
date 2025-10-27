document.getElementById('plastering-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomLength = parseFloat(document.getElementById('room-length').value);
    const roomWidth = parseFloat(document.getElementById('room-width').value);
    const roomHeight = parseFloat(document.getElementById('room-height').value);
    const doorWidth = parseFloat(document.getElementById('door-width').value);
    const doorHeight = parseFloat(document.getElementById('door-height').value);
    const numDoors = parseFloat(document.getElementById('num-doors').value);
    const windowWidth = parseFloat(document.getElementById('window-width').value);
    const windowHeight = parseFloat(document.getElementById('window-height').value);
    const numWindows = parseFloat(document.getElementById('num-windows').value);

    if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(roomHeight) || isNaN(doorWidth) || isNaN(doorHeight) || isNaN(numDoors) || isNaN(windowWidth) || isNaN(windowHeight) || isNaN(numWindows)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate total wall area
    const totalWallArea = 2 * (roomLength + roomWidth) * roomHeight;

    // Calculate area of doors to subtract
    const doorArea = doorWidth * doorHeight * numDoors;

    // Calculate area of windows to subtract
    const windowArea = windowWidth * windowHeight * numWindows;

    // Calculate net plastering area
    const netPlasteringArea = totalWallArea - doorArea - windowArea;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Wall Area: ${totalWallArea.toFixed(2)} sq ft</p>
        <p>Area of Doors: ${doorArea.toFixed(2)} sq ft</p>
        <p>Area of Windows: ${windowArea.toFixed(2)} sq ft</p>
        <p>Net Plastering Area: ${netPlasteringArea.toFixed(2)} sq ft</p>
        <p class="note">Note: This calculation assumes a rectangular room and standard openings. For complex shapes, additional calculations may be needed.</p>
    `;
});
document.getElementById('room-area-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomLength = parseFloat(document.getElementById('room-length').value);
    const roomWidth = parseFloat(document.getElementById('room-width').value);

    if (isNaN(roomLength) || isNaN(roomWidth)) {
        alert("Please enter valid numbers for room length and width.");
        return;
    }

    const roomArea = roomLength * roomWidth;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Room Area: ${roomArea.toFixed(2)} sq ft</p>
    `;
});
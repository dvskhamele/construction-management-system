
document.getElementById('calculateBtn').addEventListener('click', function() {
    const wallWidth = parseFloat(document.getElementById('wallWidth').value);
    const wallHeight = parseFloat(document.getElementById('wallHeight').value);
    const rollWidth = parseFloat(document.getElementById('rollWidth').value);
    const rollLength = parseFloat(document.getElementById('rollLength').value);

    if (isNaN(wallWidth) || isNaN(wallHeight) || isNaN(rollWidth) || isNaN(rollLength)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    const wallArea = wallWidth * wallHeight;
    const rollArea = (rollWidth / 12) * rollLength;
    const rollsNeeded = Math.ceil(wallArea / rollArea);

    const resultHTML = `
        <h3>Estimation Results:</h3>
        <p>Total Wall Area: ${wallArea.toFixed(2)} sq. ft.</p>
        <p>Wallpaper Roll Area: ${rollArea.toFixed(2)} sq. ft.</p>
        <p>Number of Rolls Needed: ${rollsNeeded}</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});

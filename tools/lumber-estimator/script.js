document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const wallLength = parseFloat(document.getElementById('wall-length').value);
        const wallHeight = parseFloat(document.getElementById('wall-height').value);
        const studSpacingCm = parseFloat(document.getElementById('stud-spacing').value);
        const numTopPlates = parseFloat(document.getElementById('num-top-plates').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(studSpacingCm) || isNaN(numTopPlates) || isNaN(wasteFactor) ||
            wallLength <= 0 || wallHeight <= 0 || studSpacingCm <= 0 || numTopPlates <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Convert stud spacing to meters
        const studSpacingM = studSpacingCm / 100;

        // Calculate number of studs
        // Add 1 for the first stud, and 2 for end studs if not already covered by spacing
        let numberOfStuds = Math.ceil(wallLength / studSpacingM) + 1; // Basic calculation
        // A more robust calculation might consider corners, openings, etc., but for a simple tool, this is a good start.

        // Calculate length of plates (bottom plate + multiple top plates)
        const plateLength = wallLength * (1 + numTopPlates);

        // Add waste factor to studs and plates
        numberOfStuds *= (1 + (wasteFactor / 100));
        const totalPlateLengthWithWaste = plateLength * (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Studs Needed: <strong>${Math.ceil(numberOfStuds)} studs</strong></p>
            <p>Estimated Total Plate Length: <strong>${totalPlateLengthWithWaste.toFixed(2)} meters</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor)</em></p>
        `;
    });
});

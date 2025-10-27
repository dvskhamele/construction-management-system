document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const areaLength = parseFloat(document.getElementById('area-length').value);
        const areaWidth = parseFloat(document.getElementById('area-width').value);
        const tileLengthCm = parseFloat(document.getElementById('tile-length').value);
        const tileWidthCm = parseFloat(document.getElementById('tile-width').value);
        const groutWidthMm = parseFloat(document.getElementById('grout-width').value);
        const adhesiveCoverage = parseFloat(document.getElementById('adhesive-coverage').value);
        const groutCoverage = parseFloat(document.getElementById('grout-coverage').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(areaLength) || isNaN(areaWidth) || isNaN(tileLengthCm) || isNaN(tileWidthCm) || isNaN(groutWidthMm) || isNaN(adhesiveCoverage) || isNaN(groutCoverage) || isNaN(wasteFactor) ||
            areaLength <= 0 || areaWidth <= 0 || tileLengthCm <= 0 || tileWidthCm <= 0 || groutWidthMm < 0 || adhesiveCoverage <= 0 || groutCoverage <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Convert cm to meters for tile dimensions
        const tileLengthM = tileLengthCm / 100;
        const tileWidthM = tileWidthCm / 100;

        // Convert mm to meters for grout width
        const groutWidthM = groutWidthMm / 1000;

        // Calculate total area to be tiled (in square meters)
        const totalArea = areaLength * areaWidth;

        // Calculate tile area including grout lines
        const tileAreaWithGrout = (tileLengthM + groutWidthM) * (tileWidthM + groutWidthM);

        // Number of tiles needed (without waste factor)
        let numberOfTiles = totalArea / tileAreaWithGrout;

        // Add waste factor
        numberOfTiles *= (1 + (wasteFactor / 100));

        // Calculate adhesive needed
        const adhesiveNeededKg = totalArea * adhesiveCoverage;

        // Calculate grout needed
        const groutNeededKg = totalArea * groutCoverage;

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Tiles Needed: <strong>${Math.ceil(numberOfTiles)} tiles</strong></p>
            <p>Estimated Adhesive Needed: <strong>${adhesiveNeededKg.toFixed(2)} kg</strong></p>
            <p>Estimated Grout Needed: <strong>${groutNeededKg.toFixed(2)} kg</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor for tiles)</em></p>
        `;
    });
});

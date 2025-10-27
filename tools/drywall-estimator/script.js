document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const roomLength = parseFloat(document.getElementById('room-length').value);
        const roomWidth = parseFloat(document.getElementById('room-width').value);
        const roomHeight = parseFloat(document.getElementById('room-height').value);
        const includeCeiling = document.getElementById('ceiling-drywall').checked;
        const sheetLength = parseFloat(document.getElementById('sheet-length').value);
        const sheetWidth = parseFloat(document.getElementById('sheet-width').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);
        const compoundCoverage = parseFloat(document.getElementById('compound-coverage').value);
        const screwsPerSheet = parseFloat(document.getElementById('screws-per-sheet').value);

        if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(roomHeight) || isNaN(sheetLength) || isNaN(sheetWidth) || isNaN(wasteFactor) || isNaN(compoundCoverage) || isNaN(screwsPerSheet) ||
            roomLength <= 0 || roomWidth <= 0 || roomHeight <= 0 || sheetLength <= 0 || sheetWidth <= 0 || wasteFactor < 0 || compoundCoverage <= 0 || screwsPerSheet <= 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Calculate total surface area (walls + optional ceiling)
        const wallArea = 2 * (roomLength + roomWidth) * roomHeight;
        let totalSurfaceArea = wallArea;

        if (includeCeiling) {
            const ceilingArea = roomLength * roomWidth;
            totalSurfaceArea += ceilingArea;
        }

        // Calculate area of one drywall sheet
        const sheetArea = sheetLength * sheetWidth;

        // Number of sheets needed (without waste factor)
        let numberOfSheets = totalSurfaceArea / sheetArea;

        // Add waste factor
        numberOfSheets *= (1 + (wasteFactor / 100));

        // Calculate joint compound needed
        const compoundNeededKg = totalSurfaceArea * compoundCoverage;

        // Calculate screws needed
        const screwsNeeded = Math.ceil(numberOfSheets) * screwsPerSheet;

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Drywall Sheets: <strong>${Math.ceil(numberOfSheets)} sheets</strong></p>
            <p>Estimated Joint Compound: <strong>${compoundNeededKg.toFixed(2)} kg</strong></p>
            <p>Estimated Screws: <strong>${Math.ceil(screwsNeeded)} screws</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor for sheets)</em></p>
        `;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const areaLength = parseFloat(document.getElementById('area-length').value);
        const areaWidth = parseFloat(document.getElementById('area-width').value);
        const areaThicknessCm = parseFloat(document.getElementById('area-thickness').value);
        const asphaltDensity = parseFloat(document.getElementById('asphalt-density').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(areaLength) || isNaN(areaWidth) || isNaN(areaThicknessCm) || isNaN(asphaltDensity) || isNaN(wasteFactor) ||
            areaLength <= 0 || areaWidth <= 0 || areaThicknessCm <= 0 || asphaltDensity <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Convert thickness to meters
        const areaThicknessM = areaThicknessCm / 100;

        // Calculate volume in cubic meters
        let volumeCubicMeters = areaLength * areaWidth * areaThicknessM;

        // Add waste factor to volume
        volumeCubicMeters *= (1 + (wasteFactor / 100));

        // Calculate tonnage
        const tonnage = (volumeCubicMeters * asphaltDensity) / 1000; // kg to tonnes

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Asphalt Volume: <strong>${volumeCubicMeters.toFixed(3)} cubic meters</strong></p>
            <p>Estimated Asphalt Tonnage: <strong>${tonnage.toFixed(2)} tonnes</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor)</em></p>
        `;
    });
});

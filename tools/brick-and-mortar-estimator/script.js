document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const wallLength = parseFloat(document.getElementById('wall-length').value);
        const wallHeight = parseFloat(document.getElementById('wall-height').value);
        const unitLengthCm = parseFloat(document.getElementById('unit-length').value);
        const unitHeightCm = parseFloat(document.getElementById('unit-height').value);
        const mortarThicknessMm = parseFloat(document.getElementById('mortar-thickness').value);
        const wasteFactor = parseFloat(document.getElementById('waste-factor').value);

        if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(unitLengthCm) || isNaN(unitHeightCm) || isNaN(mortarThicknessMm) || isNaN(wasteFactor) ||
            wallLength <= 0 || wallHeight <= 0 || unitLengthCm <= 0 || unitHeightCm <= 0 || mortarThicknessMm <= 0 || wasteFactor < 0) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#f8d7da';
            resultDiv.style.borderColor = '#f5c6cb';
            resultDiv.style.color = '#721c24';
            resultDiv.innerHTML = 'Please enter valid positive numbers for all fields.';
            return;
        }

        // Convert units to meters
        const unitLengthM = unitLengthCm / 100;
        const unitHeightM = unitHeightCm / 100;
        const mortarThicknessM = mortarThicknessMm / 1000;

        // Calculate effective unit dimensions including mortar
        const effectiveUnitLength = unitLengthM + mortarThicknessM;
        const effectiveUnitHeight = unitHeightM + mortarThicknessM;

        // Calculate number of units horizontally and vertically
        const unitsHorizontal = wallLength / effectiveUnitLength;
        const unitsVertical = wallHeight / effectiveUnitHeight;

        // Total units needed (without waste factor)
        let totalUnits = unitsHorizontal * unitsVertical;

        // Add waste factor
        totalUnits *= (1 + (wasteFactor / 100));

        // Calculate total wall area
        const wallArea = wallLength * wallHeight;

        // Mortar volume estimation (approximate, based on typical usage per sq meter)
        // A common rule of thumb is 0.02 cubic meters of mortar per square meter of wall for standard bricks
        // This can vary significantly based on unit size and joint thickness.
        // For simplicity, we'll use a general factor, or a more precise calculation if needed.
        // Let's assume 0.02 m^3 per m^2 for now, or calculate based on unit dimensions.

        // More precise mortar volume calculation:
        // Volume of one unit + mortar = effectiveUnitLength * effectiveUnitHeight * unitWidth (assuming standard width for mortar volume)
        // Volume of one unit = unitLengthM * unitHeightM * unitWidth
        // Volume of mortar per unit = (effectiveUnitLength * effectiveUnitHeight * unitWidth) - (unitLengthM * unitHeightM * unitWidth)
        // This requires unit width, which is not an input. Let's use a simpler approximation for now.

        // Approximate mortar volume (e.g., 0.02 cubic meters per square meter of wall)
        const mortarVolumePerSqMeter = 0.02; // m^3 per m^2
        let totalMortarVolume = wallArea * mortarVolumePerSqMeter;

        // Add waste factor to mortar
        totalMortarVolume *= (1 + (wasteFactor / 100));

        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e9f7ef';
        resultDiv.style.borderColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <p>Estimated Bricks/Blocks Needed: <strong>${Math.ceil(totalUnits)} units</strong></p>
            <p>Estimated Mortar Volume: <strong>${totalMortarVolume.toFixed(3)} cubic meters</strong></p>
            <p style="font-size: 0.9em; color: #333;"><em>(Includes ${wasteFactor}% waste factor)</em></p>
        `;
    });
});

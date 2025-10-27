
document.getElementById('calculateBtn').addEventListener('click', function() {
    const beamLength = parseFloat(document.getElementById('beamLength').value);
    const pointLoad = parseFloat(document.getElementById('pointLoad').value);
    const uniformLoad = parseFloat(document.getElementById('uniformLoad').value);

    if (isNaN(beamLength) || isNaN(pointLoad) || isNaN(uniformLoad)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    // Simplified calculations for demonstration purposes
    const maxBendingMoment = (pointLoad * beamLength / 4) + (uniformLoad * Math.pow(beamLength, 2) / 8);
    const requiredSectionModulus = maxBendingMoment * 12 / (0.66 * 50000); // Assuming 50 ksi steel

    const resultHTML = `
        <h3>Beam Calculation Results:</h3>
        <p>Maximum Bending Moment: ${maxBendingMoment.toFixed(2)} ft-lbs</p>
        <p>Required Section Modulus (Sx): ${requiredSectionModulus.toFixed(2)} in³</p>
        <p style="font-size: 14px; color: #888;">Note: This is a simplified calculation for demonstration purposes only. Always consult a qualified structural engineer for actual beam design.</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});

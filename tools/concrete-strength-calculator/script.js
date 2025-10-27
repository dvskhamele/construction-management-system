
document.getElementById('calculateBtn').addEventListener('click', function() {
    const cylinderDiameter = parseFloat(document.getElementById('cylinderDiameter').value);
    const appliedLoad = parseFloat(document.getElementById('appliedLoad').value);

    if (isNaN(cylinderDiameter) || isNaN(appliedLoad)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    const radius = cylinderDiameter / 2;
    const area = Math.PI * Math.pow(radius, 2);
    const compressiveStrength = appliedLoad / area;

    const resultHTML = `
        <h3>Concrete Compressive Strength:</h3>
        <p>${compressiveStrength.toFixed(2)} psi</p>
        <p style="font-size: 14px; color: #888;">Note: This is a simplified calculation. Always follow ASTM standards for concrete testing.</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});

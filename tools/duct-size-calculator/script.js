
document.getElementById('calculateBtn').addEventListener('click', function() {
    const airFlow = parseFloat(document.getElementById('airFlow').value);
    const frictionLoss = parseFloat(document.getElementById('frictionLoss').value);

    if (isNaN(airFlow) || isNaN(frictionLoss)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    // Simplified calculation using the equal friction method
    const diameter = 0.66 * Math.pow((Math.pow(airFlow, 1.852) / (1092 * frictionLoss)), 0.204);
    const velocity = airFlow / (Math.PI * Math.pow((diameter / 24), 2));

    const resultHTML = `
        <h3>Duct Size Calculation Results:</h3>
        <p>Recommended Duct Diameter: ${diameter.toFixed(2)} inches</p>
        <p>Estimated Air Velocity: ${velocity.toFixed(2)} FPM</p>
        <p style="font-size: 14px; color: #888;">Note: This is a simplified calculation for demonstration purposes only. Always consult a qualified HVAC engineer for actual duct design.</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});

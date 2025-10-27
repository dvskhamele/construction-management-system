
document.getElementById('calculateBtn').addEventListener('click', function() {
    const wireSize = parseFloat(document.getElementById('wireSize').value);
    const voltage = parseFloat(document.getElementById('voltage').value);
    const current = parseFloat(document.getElementById('current').value);
    const distance = parseFloat(document.getElementById('distance').value);

    if (isNaN(wireSize) || isNaN(voltage) || isNaN(current) || isNaN(distance)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    // Simplified calculation for copper wire
    const resistance = 0.0172 * (distance / (Math.PI * Math.pow(0.00314 * Math.pow(0.912, wireSize), 2)));
    const voltageDrop = current * resistance;
    const voltageDropPercentage = (voltageDrop / voltage) * 100;

    const resultHTML = `
        <h3>Voltage Drop Calculation Results:</h3>
        <p>Voltage Drop: ${voltageDrop.toFixed(2)} Volts</p>
        <p>Voltage Drop Percentage: ${voltageDropPercentage.toFixed(2)}%</p>
        <p style="font-size: 14px; color: #888;">Note: This is a simplified calculation for demonstration purposes only. Always consult a qualified electrician for actual circuit design.</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});

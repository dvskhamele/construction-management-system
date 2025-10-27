
document.getElementById('calculateBtn').addEventListener('click', function() {
    const pipeDiameter = parseFloat(document.getElementById('pipeDiameter').value);
    const velocity = parseFloat(document.getElementById('velocity').value);

    if (isNaN(pipeDiameter) || isNaN(velocity)) {
        document.getElementById('result').innerHTML = 'Please enter valid numbers.';
        return;
    }

    const radius = pipeDiameter / 2 / 12; // Convert inches to feet
    const area = Math.PI * Math.pow(radius, 2);
    const flowRate = area * velocity * 7.48052; // Convert cubic feet per second to gallons per minute

    const resultHTML = `
        <h3>Flow Rate Calculation Results:</h3>
        <p>Flow Rate: ${flowRate.toFixed(2)} GPM (Gallons Per Minute)</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});

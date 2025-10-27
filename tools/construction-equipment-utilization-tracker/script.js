
document.getElementById('utilization-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const availableHours = parseFloat(document.getElementById('available-hours').value);
    const operatingHours = parseFloat(document.getElementById('operating-hours').value);

    if (isNaN(availableHours) || isNaN(operatingHours) || availableHours <= 0 || operatingHours < 0) {
        alert("Please enter valid positive numbers for available hours and non-negative for operating hours.");
        return;
    }

    let utilizationRate = 0;
    if (availableHours > 0) {
        utilizationRate = (operatingHours / availableHours) * 100;
    }

    let interpretation = "";
    if (utilizationRate > 80) {
        interpretation = "(Excellent utilization - consider maintenance scheduling)";
    } else if (utilizationRate > 60) {
        interpretation = "(Good utilization)";
    } else if (utilizationRate > 40) {
        interpretation = "(Moderate utilization - potential for improvement)";
    } else {
        interpretation = "(Low utilization - review asset management strategy)";
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Available Hours: ${availableHours.toFixed(2)}</p>
        <p>Actual Operating Hours: ${operatingHours.toFixed(2)}</p>
        <p>Utilization Rate: ${utilizationRate.toFixed(2)}% ${interpretation}</p>
    `;
});

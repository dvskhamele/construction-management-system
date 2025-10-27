document.getElementById('labour-cost-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const numWorkers = parseFloat(document.getElementById('num-workers').value);
    const hoursPerWorker = parseFloat(document.getElementById('hours-per-worker').value);
    const wagePerHour = parseFloat(document.getElementById('wage-per-hour').value);
    const numDays = parseFloat(document.getElementById('num-days').value);

    if (isNaN(numWorkers) || isNaN(hoursPerWorker) || isNaN(wagePerHour) || isNaN(numDays) || numWorkers <= 0 || hoursPerWorker <= 0 || wagePerHour < 0 || numDays <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const totalLabourCost = numWorkers * hoursPerWorker * wagePerHour * numDays;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Estimated Labour Cost: $${totalLabourCost.toFixed(2)}</p>
    `;
});
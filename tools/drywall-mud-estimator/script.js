
document.getElementById('mud-estimator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const drywallArea = parseFloat(document.getElementById('drywall-area').value);
    const numCoats = parseFloat(document.getElementById('num-coats').value);
    const mudTypeCoverageRate = parseFloat(document.getElementById('mud-type').value);

    if (isNaN(drywallArea) || isNaN(numCoats) || drywallArea <= 0 || numCoats <= 0) {
        alert("Please enter valid positive numbers for drywall area and number of coats.");
        return;
    }

    const estimatedMudLbs = drywallArea * numCoats * mudTypeCoverageRate;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Drywall Mud Needed: ${estimatedMudLbs.toFixed(2)} lbs</p>
        <p class="note">Note: This is an estimate. Actual mud needed may vary based on application technique, surface condition, and specific product coverage.</p>
    `;
});

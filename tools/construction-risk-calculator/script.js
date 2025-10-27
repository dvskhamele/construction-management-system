
document.getElementById('risk-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const designProb = parseFloat(document.getElementById('design-prob').value);
    const designImpact = parseFloat(document.getElementById('design-impact').value);
    const resourceProb = parseFloat(document.getElementById('resource-prob').value);
    const resourceImpact = parseFloat(document.getElementById('resource-impact').value);
    const weatherProb = parseFloat(document.getElementById('weather-prob').value);
    const weatherImpact = parseFloat(document.getElementById('weather-impact').value);

    if (isNaN(designProb) || isNaN(designImpact) || isNaN(resourceProb) || isNaN(resourceImpact) || isNaN(weatherProb) || isNaN(weatherImpact)) {
        alert("Please enter valid numbers for all risk factors.");
        return;
    }

    const designRiskScore = designProb * designImpact;
    const resourceRiskScore = resourceProb * resourceImpact;
    const weatherRiskScore = weatherProb * weatherImpact;

    const totalProjectRiskScore = designRiskScore + resourceRiskScore + weatherRiskScore;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Design Complexity Risk Score: ${designRiskScore}</p>
        <p>Resource Availability Risk Score: ${resourceRiskScore}</p>
        <p>Weather Conditions Risk Score: ${weatherRiskScore}</p>
        <p><strong>Total Project Risk Score: ${totalProjectRiskScore}</strong></p>
        <p class="note">Note: Risk scores are indicative. A higher score suggests higher risk. This tool provides a simplified assessment.</p>
    `;
});

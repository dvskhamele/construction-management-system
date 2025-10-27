
document.getElementById('schedule-variance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const earnedValue = parseFloat(document.getElementById('earned-value').value);
    const plannedValue = parseFloat(document.getElementById('planned-value').value);

    if (isNaN(earnedValue) || isNaN(plannedValue)) {
        alert("Please enter valid numbers for Earned Value and Planned Value.");
        return;
    }

    const scheduleVariance = earnedValue - plannedValue;
    let schedulePerformanceIndex = 0;

    if (plannedValue !== 0) {
        schedulePerformanceIndex = earnedValue / plannedValue;
    } else {
        alert("Planned Value cannot be zero for SPI calculation.");
        return;
    }

    let svInterpretation = "";
    if (scheduleVariance > 0) {
        svInterpretation = "(Ahead of schedule)";
    } else if (scheduleVariance < 0) {
        svInterpretation = "(Behind schedule)";
    } else {
        svInterpretation = "(On schedule)";
    }

    let spiInterpretation = "";
    if (schedulePerformanceIndex > 1) {
        spiInterpretation = "(Ahead of schedule)";
    } else if (schedulePerformanceIndex < 1) {
        spiInterpretation = "(Behind schedule)";
    } else {
        spiInterpretation = "(On schedule)";
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Schedule Variance (SV): $${scheduleVariance.toFixed(2)} ${svInterpretation}</p>
        <p>Schedule Performance Index (SPI): ${schedulePerformanceIndex.toFixed(2)} ${spiInterpretation}</p>
        <p class="note">Note: These metrics are key indicators in Earned Value Management for project tracking.</p>
    `;
});

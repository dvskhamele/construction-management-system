document.addEventListener('DOMContentLoaded', () => {
    const resultDetails = document.getElementById('resultDetails') as HTMLDivElement;
    const backToCalculatorBtn = document.getElementById('backToCalculatorBtn') as HTMLButtonElement;
    const leadEmailInput = document.getElementById('leadEmail') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribeBtn') as HTMLButtonElement;

    const logAnalytics = async (eventType: string, eventDetails: string) => {
        const timestamp = new Date().toISOString();
        const logEntry = `Timestamp: ${timestamp}, EventType: ${eventType}, Tool: PaintCostEstimator, Details: ${eventDetails}\n`;
        // In a real scenario, this would append to /data/analytics_events.log
        console.log("Analytics Log: ", logEntry);
    };

    const appendToLeads = async (email: string) => {
        const timestamp = new Date().toISOString();
        const leadEntry = `Timestamp: ${timestamp}, Tool: PaintCostEstimator, Email: ${email}\n`;
        // In a real scenario, this would append to /data/prelogin_leads/leads.html
        console.log("Lead Captured: ", leadEntry);
    };

    logAnalytics('ToolResultViewed', 'PaintCostEstimator');

    const results = JSON.parse(localStorage.getItem('paintCostEstimatorResults') || '{}');

    if (Object.keys(results).length > 0) {
        resultDetails.innerHTML = `
            <p><strong>Room Length:</strong> ${results.roomLength} meters</p>
            <p><strong>Room Width:</strong> ${results.roomWidth} meters</p>
            <p><strong>Room Height:</strong> ${results.roomHeight} meters</p>
            <p><strong>Number of Doors:</strong> ${results.numDoors}</p>
            <p><strong>Number of Windows:</strong> ${results.numWindows}</p>
            <p><strong>Coats of Paint:</strong> ${results.coats}</p>
            <p><strong>Paint Coverage:</strong> ${results.coverage} sq.m per liter</p>
            <p><strong>Cost per Liter:</strong> ${results.costPerLiter} ${results.currency}</p>
            <p><strong>Estimated Paint Needed:</strong> <span style="font-weight: bold; color: #28a745;">${results.paintNeeded} ${results.unit}</span></p>
            <p><strong>Estimated Total Cost:</strong> <span style="font-weight: bold; color: #28a745;">${results.totalCost} ${results.currency}</span></p>
        `;
    } else {
        resultDetails.innerHTML = '<p class="error-message">No results found. Please go back to the estimator.</p>';
    }

    backToCalculatorBtn.addEventListener('click', () => {
        window.location.href = '/tools/paint-cost-estimator/paint-cost-estimator.html';
    });

    subscribeBtn.addEventListener('click', () => {
        const email = leadEmailInput.value;
        if (email && email.includes('@') && email.includes('.')) {
            appendToLeads(email);
            logAnalytics('LeadCaptured', `Email: ${email}`);
            alert('Thank you for subscribing!');
            leadEmailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

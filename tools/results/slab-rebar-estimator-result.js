document.addEventListener('DOMContentLoaded', () => {
    const resultDetails = document.getElementById('resultDetails') as HTMLDivElement;
    const backToCalculatorBtn = document.getElementById('backToCalculatorBtn') as HTMLButtonElement;
    const leadEmailInput = document.getElementById('leadEmail') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribeBtn') as HTMLButtonElement;

    const logAnalytics = async (eventType: string, eventDetails: string) => {
        const timestamp = new Date().toISOString();
        const logEntry = `Timestamp: ${timestamp}, EventType: ${eventType}, Tool: SlabRebarEstimator, Details: ${eventDetails}\n`;
        // In a real scenario, this would append to /data/analytics_events.log
        console.log("Analytics Log: ", logEntry);
    };

    const appendToLeads = async (email: string) => {
        const timestamp = new Date().toISOString();
        const leadEntry = `Timestamp: ${timestamp}, Tool: SlabRebarEstimator, Email: ${email}\n`;
        // In a real scenario, this would append to /data/prelogin_leads/leads.html
        console.log("Lead Captured: ", leadEntry);
    };

    logAnalytics('ToolResultViewed', 'SlabRebarEstimator');

    const results = JSON.parse(localStorage.getItem('slabRebarEstimatorResults') || '{}');

    if (Object.keys(results).length > 0) {
        resultDetails.innerHTML = `
            <p><strong>Slab Length:</strong> ${results.slabLength} meters</p>
            <p><strong>Slab Width:</strong> ${results.slabWidth} meters</p>
            <p><strong>Rebar Spacing:</strong> ${results.rebarSpacing} meters</p>
            <p><strong>Rebar Diameter:</strong> ${results.rebarDiameter} mm</p>
            <p><strong>Estimated Total Rebar Length:</strong> <span style="font-weight: bold; color: #28a745;">${results.totalLength} ${results.lengthUnit}</span></p>
            <p><strong>Estimated Total Rebar Weight:</strong> <span style="font-weight: bold; color: #28a745;">${results.totalWeight} ${results.weightUnit}</span></p>
        `;
    } else {
        resultDetails.innerHTML = '<p class="error-message">No results found. Please go back to the estimator.</p>';
    }

    backToCalculatorBtn.addEventListener('click', () => {
        window.location.href = '/tools/slab-rebar-estimator/slab-rebar-estimator.html';
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

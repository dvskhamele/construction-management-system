document.addEventListener('DOMContentLoaded', () => {
    const resultDetails = document.getElementById('resultDetails') as HTMLDivElement;
    const backToCalculatorBtn = document.getElementById('backToCalculatorBtn') as HTMLButtonElement;
    const leadEmailInput = document.getElementById('leadEmail') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribeBtn') as HTMLButtonElement;

    const logAnalytics = async (eventType: string, eventDetails: string) => {
        const timestamp = new Date().toISOString();
        const logEntry = `Timestamp: ${timestamp}, EventType: ${eventType}, Tool: BrickAndMortarCalculator, Details: ${eventDetails}\n`;
        // In a real scenario, this would append to /data/analytics_events.log
        console.log("Analytics Log: ", logEntry);
    };

    const appendToLeads = async (email: string) => {
        const timestamp = new Date().toISOString();
        const leadEntry = `Timestamp: ${timestamp}, Tool: BrickAndMortarCalculator, Email: ${email}\n`;
        // In a real scenario, this would append to /data/prelogin_leads/leads.html
        console.log("Lead Captured: ", leadEntry);
    };

    logAnalytics('ToolResultViewed', 'BrickAndMortarCalculator');

    const results = JSON.parse(localStorage.getItem('brickAndMortarResults') || '{}');

    if (Object.keys(results).length > 0) {
        resultDetails.innerHTML = `
            <p><strong>Wall Length:</strong> ${results.wallLength} meters</p>
            <p><strong>Wall Height:</strong> ${results.wallHeight} meters</p>
            <p><strong>Brick Length:</strong> ${results.brickLength} meters</p>
            <p><strong>Brick Width:</strong> ${results.brickWidth} meters</p>
            <p><strong>Brick Height:</strong> ${results.brickHeight} meters</p>
            <p><strong>Mortar Joint Thickness:</strong> ${results.mortarThickness} meters</p>
            <p><strong>Estimated Number of Bricks:</strong> <span style="font-weight: bold; color: #28a745;">${results.numBricks}</span></p>
            <p><strong>Estimated Mortar Volume:</strong> <span style="font-weight: bold; color: #28a745;">${results.mortarVolume} ${results.mortarUnit}</span></p>
        `;
    } else {
        resultDetails.innerHTML = '<p class="error-message">No results found. Please go back to the calculator.</p>';
    }

    backToCalculatorBtn.addEventListener('click', () => {
        window.location.href = '/tools/brick-and-mortar-calculator/brick-and-mortar-calculator.html';
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

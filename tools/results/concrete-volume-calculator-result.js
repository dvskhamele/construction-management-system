document.addEventListener('DOMContentLoaded', () => {
    const resultDetails = document.getElementById('resultDetails') as HTMLDivElement;
    const backToCalculatorBtn = document.getElementById('backToCalculatorBtn') as HTMLButtonElement;
    const leadEmailInput = document.getElementById('leadEmail') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribeBtn') as HTMLButtonElement;

    const logAnalytics = async (eventType: string, eventDetails: string) => {
        const timestamp = new Date().toISOString();
        const logEntry = `Timestamp: ${timestamp}, EventType: ${eventType}, Tool: ConcreteVolumeCalculator, Details: ${eventDetails}\n`;
        // In a real scenario, this would append to /data/analytics_events.log
        console.log("Analytics Log: ", logEntry);
    };

    const appendToLeads = async (email: string) => {
        const timestamp = new Date().toISOString();
        const leadEntry = `Timestamp: ${timestamp}, Tool: ConcreteVolumeCalculator, Email: ${email}\n`;
        // In a real scenario, this would append to /data/prelogin_leads/leads.html
        console.log("Lead Captured: ", leadEntry);
    };

    logAnalytics('ToolResultViewed', 'ConcreteVolumeCalculator');

    const results = JSON.parse(localStorage.getItem('concreteVolumeResults') || '{}');

    if (Object.keys(results).length > 0) {
        resultDetails.innerHTML = `
            <p><strong>Length:</strong> ${results.length} meters</p>
            <p><strong>Width:</strong> ${results.width} meters</p>
            <p><strong>Thickness:</strong> ${results.thickness} meters</p>
            <p><strong>Estimated Volume:</strong> <span style="font-weight: bold; color: #28a745;">${results.volume} ${results.unit}</span></p>
        `;
    } else {
        resultDetails.innerHTML = '<p class="error-message">No results found. Please go back to the calculator.</p>';
    }

    backToCalculatorBtn.addEventListener('click', () => {
        window.location.href = '/tools/concrete-volume-calculator/concrete-volume-calculator.html';
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

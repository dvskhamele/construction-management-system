document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    const coatsInput = document.getElementById('coats');
    const coverageInput = document.getElementById('coverage');
    const calculateBtn = document.getElementById('calculateBtn');
    const errorDisplay = document.getElementById('error');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');

    const logAnalytics = async (eventType, eventDetails) => {
        const timestamp = new Date().toISOString();
        const logEntry = `Timestamp: ${timestamp}, EventType: ${eventType}, Tool: PaintCoverageCalculator, Details: ${eventDetails}\n`;
        // In a real scenario, this would append to /data/analytics_events.log
        console.log("Analytics Log: ", logEntry);
    };

    const appendToLeads = async (email) => {
        const timestamp = new Date().toISOString();
        const leadEntry = `Timestamp: ${timestamp}, Tool: PaintCoverageCalculator, Email: ${email}\n`;
        // In a real scenario, this would append to /data/prelogin_leads/leads.json
        console.log("Lead Captured: ", leadEntry);
    };

    logAnalytics('ToolOpened', 'PaintCoverageCalculator');

    calculateBtn.addEventListener('click', () => {
        errorDisplay.textContent = '';
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);
        const coats = parseInt(coatsInput.value);
        const coverage = parseFloat(coverageInput.value);

        if (isNaN(length) || isNaN(width) || isNaN(coats) || isNaN(coverage) || length <= 0 || width <= 0 || coats <= 0 || coverage <= 0) {
            errorDisplay.textContent = 'Please enter valid positive numbers for all fields.';
            return;
        }

        const totalArea = length * width;
        const totalPaintNeeded = (totalArea * coats) / coverage;

        const resultId = Date.now();
        const results = {
            length,
            width,
            coats,
            coverage,
            totalPaintNeeded: totalPaintNeeded.toFixed(2),
            unit: 'liters'
        };

        localStorage.setItem('paintCoverageResults', JSON.stringify(results));
        logAnalytics('ToolSubmitted', `Calculated paint needed: ${totalPaintNeeded.toFixed(2)} liters`);

        // Redirect to results page
        window.location.href = `/tools/results/paint-coverage-calculator-${resultId}.html`;
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

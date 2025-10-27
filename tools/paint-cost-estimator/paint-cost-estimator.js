document.addEventListener('DOMContentLoaded', () => {
    const roomLengthInput = document.getElementById('roomLength') as HTMLInputElement;
    const roomWidthInput = document.getElementById('roomWidth') as HTMLInputElement;
    const roomHeightInput = document.getElementById('roomHeight') as HTMLInputElement;
    const numDoorsInput = document.getElementById('numDoors') as HTMLInputElement;
    const numWindowsInput = document.getElementById('numWindows') as HTMLInputElement;
    const coatsInput = document.getElementById('coats') as HTMLInputElement;
    const coverageInput = document.getElementById('coverage') as HTMLInputElement;
    const costPerLiterInput = document.getElementById('costPerLiter') as HTMLInputElement;
    const calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
    const errorDisplay = document.getElementById('error') as HTMLParagraphElement;
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

    logAnalytics('ToolOpened', 'PaintCostEstimator');

    calculateBtn.addEventListener('click', () => {
        errorDisplay.textContent = '';
        const roomLength = parseFloat(roomLengthInput.value);
        const roomWidth = parseFloat(roomWidthInput.value);
        const roomHeight = parseFloat(roomHeightInput.value);
        const numDoors = parseInt(numDoorsInput.value);
        const numWindows = parseInt(numWindowsInput.value);
        const coats = parseInt(coatsInput.value);
        const coverage = parseFloat(coverageInput.value);
        const costPerLiter = parseFloat(costPerLiterInput.value);

        if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(roomHeight) || roomLength <= 0 || roomWidth <= 0 || roomHeight <= 0 ||
            isNaN(numDoors) || numDoors < 0 || isNaN(numWindows) || numWindows < 0 ||
            isNaN(coats) || coats < 1 || isNaN(coverage) || coverage <= 0 || isNaN(costPerLiter) || costPerLiter < 0) {
            errorDisplay.textContent = 'Please enter valid positive numbers for all dimensions and costs.';
            return;
        }

        // Calculate wall area
        const wallArea = 2 * (roomLength + roomWidth) * roomHeight;

        // Estimate area of doors and windows (average sizes)
        const doorArea = numDoors * 2.0 * 0.8; // 2m height, 0.8m width
        const windowArea = numWindows * 1.2 * 1.0; // 1.2m height, 1.0m width

        const paintableArea = (wallArea - doorArea - windowArea) * coats;
        const paintNeeded = paintableArea / coverage;
        const totalCost = paintNeeded * costPerLiter;

        const resultId = Date.now();
        const results = {
            roomLength,
            roomWidth,
            roomHeight,
            numDoors,
            numWindows,
            coats,
            coverage,
            costPerLiter,
            paintNeeded: paintNeeded.toFixed(2),
            totalCost: totalCost.toFixed(2),
            unit: 'liters',
            currency: 'INR'
        };

        localStorage.setItem('paintCostEstimatorResults', JSON.stringify(results));
        logAnalytics('ToolSubmitted', `Estimated paint needed: ${paintNeeded.toFixed(2)} liters, Cost: ${totalCost.toFixed(2)} INR`);

        // Redirect to results page
        window.location.href = `/tools/results/paint-cost-estimator-${resultId}.html`;
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

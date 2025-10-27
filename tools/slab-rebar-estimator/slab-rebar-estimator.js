document.addEventListener('DOMContentLoaded', () => {
    const slabLengthInput = document.getElementById('slabLength') as HTMLInputElement;
    const slabWidthInput = document.getElementById('slabWidth') as HTMLInputElement;
    const rebarSpacingInput = document.getElementById('rebarSpacing') as HTMLInputElement;
    const rebarDiameterInput = document.getElementById('rebarDiameter') as HTMLSelectElement;
    const calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
    const errorDisplay = document.getElementById('error') as HTMLParagraphElement;
    const leadEmailInput = document.getElementById('leadEmail') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribeBtn') as HTMLButtonElement;

    // Approximate rebar density (kg/m) for common diameters
    const rebarDensities: { [key: string]: number } = {
        '8': 0.395,   // 8 mm
        '10': 0.617,  // 10 mm
        '12': 0.888,  // 12 mm
        '16': 1.579,  // 16 mm
        '20': 2.466,  // 20 mm
        '25': 3.853   // 25 mm
    };

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

    logAnalytics('ToolOpened', 'SlabRebarEstimator');

    calculateBtn.addEventListener('click', () => {
        errorDisplay.textContent = '';
        const slabLength = parseFloat(slabLengthInput.value);
        const slabWidth = parseFloat(slabWidthInput.value);
        const rebarSpacing = parseFloat(rebarSpacingInput.value);
        const rebarDiameter = rebarDiameterInput.value;
        const rebarDensity = rebarDensities[rebarDiameter];

        if (isNaN(slabLength) || isNaN(slabWidth) || slabLength <= 0 || slabWidth <= 0 ||
            isNaN(rebarSpacing) || rebarSpacing <= 0 || !rebarDensity) {
            errorDisplay.textContent = 'Please enter valid positive numbers for slab dimensions and rebar spacing, and select a rebar diameter.';
            return;
        }

        // Calculate number of rebars along length and width
        const numRebarsLength = Math.ceil(slabWidth / rebarSpacing) + 1; // +1 for the first/last bar
        const numRebarsWidth = Math.ceil(slabLength / rebarSpacing) + 1;

        // Total length of rebar
        const totalLength = (numRebarsLength * slabLength) + (numRebarsWidth * slabWidth);

        // Total weight of rebar
        const totalWeight = totalLength * rebarDensity;

        const resultId = Date.now();
        const results = {
            slabLength,
            slabWidth,
            rebarSpacing,
            rebarDiameter,
            totalLength: totalLength.toFixed(2),
            totalWeight: totalWeight.toFixed(2),
            lengthUnit: 'meters',
            weightUnit: 'kg'
        };

        localStorage.setItem('slabRebarEstimatorResults', JSON.stringify(results));
        logAnalytics('ToolSubmitted', `Estimated rebar length: ${totalLength.toFixed(2)} m, Weight: ${totalWeight.toFixed(2)} kg`);

        // Redirect to results page
        window.location.href = `/tools/results/slab-rebar-estimator-${resultId}.html`;
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

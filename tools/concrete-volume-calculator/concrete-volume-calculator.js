document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('length') as HTMLInputElement;
    const widthInput = document.getElementById('width') as HTMLInputElement;
    const thicknessInput = document.getElementById('thickness') as HTMLInputElement;
    const calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
    const errorDisplay = document.getElementById('error') as HTMLParagraphElement;
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

    logAnalytics('ToolOpened', 'ConcreteVolumeCalculator');

    calculateBtn.addEventListener('click', () => {
        errorDisplay.textContent = '';
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);
        const thickness = parseFloat(thicknessInput.value);

        if (isNaN(length) || isNaN(width) || isNaN(thickness) || length <= 0 || width <= 0 || thickness <= 0) {
            errorDisplay.textContent = 'Please enter valid positive numbers for all dimensions.';
            return;
        }

        const volume = length * width * thickness;

        const resultId = Date.now();
        const results = {
            length,
            width,
            thickness,
            volume: volume.toFixed(2),
            unit: 'cubic meters'
        };

        localStorage.setItem('concreteVolumeResults', JSON.stringify(results));
        logAnalytics('ToolSubmitted', `Calculated volume: ${volume.toFixed(2)} cubic meters`);

        // Redirect to results page
        window.location.href = `/tools/results/concrete-volume-calculator-${resultId}.html`;
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

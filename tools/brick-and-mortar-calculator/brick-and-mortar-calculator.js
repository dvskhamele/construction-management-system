document.addEventListener('DOMContentLoaded', () => {
    const wallLengthInput = document.getElementById('wallLength') as HTMLInputElement;
    const wallHeightInput = document.getElementById('wallHeight') as HTMLInputElement;
    const brickLengthInput = document.getElementById('brickLength') as HTMLInputElement;
    const brickWidthInput = document.getElementById('brickWidth') as HTMLInputElement;
    const brickHeightInput = document.getElementById('brickHeight') as HTMLInputElement;
    const mortarThicknessInput = document.getElementById('mortarThickness') as HTMLInputElement;
    const calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
    const errorDisplay = document.getElementById('error') as HTMLParagraphElement;
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

    logAnalytics('ToolOpened', 'BrickAndMortarCalculator');

    calculateBtn.addEventListener('click', () => {
        errorDisplay.textContent = '';
        const wallLength = parseFloat(wallLengthInput.value);
        const wallHeight = parseFloat(wallHeightInput.value);
        const brickLength = parseFloat(brickLengthInput.value);
        const brickWidth = parseFloat(brickWidthInput.value);
        const brickHeight = parseFloat(brickHeightInput.value);
        const mortarThickness = parseFloat(mortarThicknessInput.value);

        if (isNaN(wallLength) || isNaN(wallHeight) || wallLength <= 0 || wallHeight <= 0 ||
            isNaN(brickLength) || isNaN(brickWidth) || isNaN(brickHeight) || brickLength <= 0 || brickWidth <= 0 || brickHeight <= 0 ||
            isNaN(mortarThickness) || mortarThickness < 0) {
            errorDisplay.textContent = 'Please enter valid positive numbers for all dimensions.';
            return;
        }

        // Calculate number of bricks
        const brickAreaWithMortar = (brickLength + mortarThickness) * (brickHeight + mortarThickness);
        const wallArea = wallLength * wallHeight;
        const numBricks = Math.ceil(wallArea / brickAreaWithMortar);

        // Calculate mortar volume
        const brickVolume = brickLength * brickWidth * brickHeight;
        const wallVolume = wallLength * wallHeight * brickWidth; // Assuming wall thickness is brick width
        const mortarVolume = wallVolume - (numBricks * brickVolume);

        const resultId = Date.now();
        const results = {
            wallLength,
            wallHeight,
            brickLength,
            brickWidth,
            brickHeight,
            mortarThickness,
            numBricks,
            mortarVolume: mortarVolume.toFixed(3),
            mortarUnit: 'cubic meters'
        };

        localStorage.setItem('brickAndMortarResults', JSON.stringify(results));
        logAnalytics('ToolSubmitted', `Estimated bricks: ${numBricks}, Mortar: ${mortarVolume.toFixed(3)} cubic meters`);

        // Redirect to results page
        window.location.href = `/tools/results/brick-and-mortar-calculator-${resultId}.html`;
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

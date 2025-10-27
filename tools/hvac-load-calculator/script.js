document.addEventListener('DOMContentLoaded', () => {
    logAnalyticsEvent('ToolOpened', { toolName: 'HVACLoadCalculator' });

    const calculatorForm = document.getElementById('calculatorForm');
    const resultsDiv = document.getElementById('results');
    const coolingLoadSpan = document.getElementById('coolingLoad');
    const heatingLoadSpan = document.getElementById('heatingLoad');
    const shareableLink = document.getElementById('shareableLink');
    const leadForm = document.getElementById('leadForm');

    const urlParams = new URLSearchParams(window.location.search);
    const area_url = urlParams.get('area');
    const insulation_url = urlParams.get('insulation');
    const windows_url = urlParams.get('windows');
    const occupants_url = urlParams.get('occupants');

    if(area_url && insulation_url && windows_url && occupants_url) {
        document.getElementById('area').value = area_url;
        document.getElementById('insulation').value = insulation_url;
        document.getElementById('windows').value = windows_url;
        document.getElementById('occupants').value = occupants_url;
        calculatorForm.dispatchEvent(new Event('submit'));
    }

    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        logAnalyticsEvent('ToolSubmitted', { toolName: 'HVACLoadCalculator' });

        const area = parseFloat(document.getElementById('area').value);
        const insulation = document.getElementById('insulation').value;
        const windows = parseInt(document.getElementById('windows').value);
        const occupants = parseInt(document.getElementById('occupants').value);

        if (isNaN(area) || area <= 0 || isNaN(windows) || windows < 0 || isNaN(occupants) || occupants < 0) {
            alert('Please enter valid positive numbers for area, windows, and occupants.');
            return;
        }

        let coolingFactor = 25; // BTU/hr per sq ft for average insulation
        let heatingFactor = 20; // BTU/hr per sq ft for average insulation

        if (insulation === 'poor') {
            coolingFactor = 30;
            heatingFactor = 25;
        } else if (insulation === 'good') {
            coolingFactor = 20;
            heatingFactor = 15;
        }

        // Additional load for windows and occupants (simplified)
        const windowCoolingLoad = windows * 1000; // BTU/hr per window
        const windowHeatingLoad = windows * 500; // BTU/hr per window
        const occupantCoolingLoad = occupants * 400; // BTU/hr per person
        const occupantHeatingLoad = occupants * 200; // BTU/hr per person

        const totalCoolingLoad = (area * coolingFactor) + windowCoolingLoad + occupantCoolingLoad;
        const totalHeatingLoad = (area * heatingFactor) + windowHeatingLoad + occupantHeatingLoad;

        coolingLoadSpan.textContent = totalCoolingLoad.toFixed(0);
        heatingLoadSpan.textContent = totalHeatingLoad.toFixed(0);
        resultsDiv.classList.remove('hidden');

        const calculation = { area, insulation, windows, occupants, totalCoolingLoad, totalHeatingLoad, timestamp: new Date().toISOString() };
        saveCalculation(calculation);

        const shareUrl = `${window.location.pathname}?area=${area}&insulation=${insulation}&windows=${windows}&occupants=${occupants}`;
        shareableLink.href = shareUrl;

        logAnalyticsEvent('ToolResultViewed', { toolName: 'HVACLoadCalculator', result: { cooling: totalCoolingLoad, heating: totalHeatingLoad } });
    });

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (email) {
            logAnalyticsEvent('LeadCaptured', { toolName: 'HVACLoadCalculator', email });
            alert(`Thank you for subscribing! A detailed report will be sent to ${email}.`);
            leadForm.reset();
            saveLead(email);
        }
    });

    function saveCalculation(calculation) {
        try {
            let calculations = JSON.parse(localStorage.getItem('hvacCalculations')) || [];
            calculations.push(calculation);
            localStorage.setItem('hvacCalculations', JSON.stringify(calculations));
        } catch (e) {
            console.error("Failed to save calculation to local storage", e);
        }
    }

    function saveLead(email) {
        try {
            let leads = JSON.parse(localStorage.getItem('toolLeads')) || [];
            if (!leads.includes(email)) {
                leads.push(email);
                localStorage.setItem('toolLeads', JSON.stringify(leads));
            }
        } catch (e) {
            console.error("Failed to save lead to local storage", e);
        }
    }

    function logAnalyticsEvent(eventName, data) {
        console.log(`Analytics Event: ${eventName}`, data);
    }
});
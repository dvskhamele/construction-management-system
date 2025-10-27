
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-checklist');
    const checklistOutput = document.getElementById('checklist-output');
    const options = document.querySelectorAll('.options input[type="checkbox"]');

    const checklistData = {
        site_access_and_security: [
            'Is the site securely fenced and access controlled?',
            'Are all entry/exit points clearly marked?',
            'Is there adequate lighting for security during non-working hours?',
            'Are visitor sign-in procedures in place and followed?'
        ],
        housekeeping_and_waste_management: [
            'Are walkways and work areas clear of obstructions and debris?',
            'Are waste bins available and regularly emptied?',
            'Is hazardous waste stored and disposed of correctly?',
            'Are materials stored neatly and safely, preventing trip hazards?'
        ],
        structural_elements: [
            'Are formwork and shoring systems properly installed and stable?',
            'Is rebar correctly placed and secured according to drawings?',
            'Are concrete pours being conducted according to specifications (mix, slump, curing)?',
            'Are structural steel connections properly bolted/welded and inspected?'
        ],
        electrical_installations: [
            'Are temporary electrical installations safe and properly grounded?',
            'Are all electrical cables protected from damage and trip hazards?',
            'Are distribution boards and panels clearly labeled and secured?',
            'Is there a system for lockout/tagout procedures for electrical work?'
        ],
        plumbing_and_drainage: [
            'Are rough-in plumbing installations correctly aligned and secured?',
            'Are drainage systems installed with correct slopes and connections?',
            'Are pressure tests conducted on water supply lines as required?',
            'Is there proper protection for installed pipes from damage?'
        ],
        fire_safety_and_emergency_preparedness: [
            'Are fire extinguishers readily accessible and inspected?',
            'Are emergency exits clearly marked and unobstructed?',
            'Is there a clear emergency evacuation plan and assembly point?',
            'Are workers trained on fire prevention and emergency procedures?'
        ],
        environmental_protection: [
            'Are measures in place to control dust and noise pollution?',
            'Is there a plan for erosion and sediment control?',
            'Are chemical spills contained and cleaned up promptly?',
            'Is water discharge managed to prevent contamination?'
        ]
    };

    generateButton.addEventListener('click', () => {
        let checklistHTML = '<h2>Your Custom Site Inspection Checklist</h2>';
        let categorySelected = false;

        options.forEach(option => {
            if (option.checked) {
                categorySelected = true;
                const category = option.value;
                checklistHTML += `<h3>${option.parentElement.textContent}</h3>`;
                checklistHTML += '<ul>';
                checklistData[category].forEach(item => {
                    checklistHTML += `<li><input type="checkbox"> ${item}</li>`;
                });
                checklistHTML += '</ul>';
            }
        });

        if (!categorySelected) {
            checklistOutput.innerHTML = '<p>Please select at least one category.</p>';
        } else {
            checklistOutput.innerHTML = checklistHTML;
        }
    });
});

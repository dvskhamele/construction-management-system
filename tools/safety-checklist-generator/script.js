
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-checklist');
    const checklistOutput = document.getElementById('checklist-output');
    const options = document.querySelectorAll('.options input[type="checkbox"]');

    const checklistData = {
        personal_protective_equipment: [
            'Are all workers wearing hard hats?',
            'Are safety glasses or face shields worn when required?',
            'Is appropriate footwear being worn by all personnel?',
            'Are high-visibility vests worn near moving equipment?',
            'Are gloves appropriate for the task being worn?'
        ],
        fall_protection: [
            'Are fall protection systems in place for work at heights over 6 feet?',
            'Are guardrails, safety nets, or personal fall arrest systems inspected and in good condition?',
            'Are all floor openings and holes covered or guarded?',
            'Has training on fall protection been provided to all relevant workers?'
        ],
        scaffolding: [
            'Is the scaffold erected on a stable and level foundation?',
            'Is the scaffold plumb and properly braced?',
            'Are all platforms fully planked and free of debris?',
            'Is there safe access to all scaffold platforms?',
            'Has the scaffold been inspected by a competent person before use?'
        ],
        electrical_safety: [
            'Are all power tools and equipment properly grounded?',
            'Are ground-fault circuit interrupters (GFCIs) used for all temporary power?',
            'Are extension cords in good condition and properly rated for the load?',
            'Are workers maintaining a safe distance from overhead power lines?'
        ],
        excavation_and_trenching: [
            'Has the location of underground utilities been identified?',
            'Are trenches and excavations properly shored or sloped to prevent collapse?',
            'Is there a safe means of egress from the trench (ladders, ramps)?',
            'Are materials and equipment kept at a safe distance from the edge of the excavation?'
        ],
        cranes_and_hoists: [
            'Is the crane operator certified and qualified?',
            'Has the crane been inspected before each shift?',
            'Is the swing radius of the crane properly barricaded?',
            'Are load charts available and being followed?',
            'Are taglines used to control loads?'
        ],
        fire_safety: [
            'Are fire extinguishers readily available and fully charged?',
            'Are flammable and combustible materials stored in a safe location?',
            'Is there a designated smoking area?',
            'Are emergency exit routes clear and unobstructed?'
        ]
    };

    generateButton.addEventListener('click', () => {
        let checklistHTML = '<h2>Your Custom Safety Checklist</h2>';
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

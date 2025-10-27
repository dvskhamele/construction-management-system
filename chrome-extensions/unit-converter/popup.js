document.addEventListener('DOMContentLoaded', function() {
    const conversionType = document.getElementById('conversionType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const inputValue = document.getElementById('inputValue');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    const units = {
        length: {
            "Meters (m)": 1,
            "Feet (ft)": 0.3048,
            "Inches (in)": 0.0254,
            "Yards (yd)": 0.9144
        },
        area: {
            "Square Meters (sq.m)": 1,
            "Square Feet (sq.ft)": 0.092903,
            "Acres": 4046.86
        },
        volume: {
            "Cubic Meters (cu.m)": 1,
            "Cubic Feet (cu.ft)": 0.0283168
        }
    };

    function populateUnits() {
        const type = conversionType.value;
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        for (const unit in units[type]) {
            fromUnit.add(new Option(unit, units[type][unit]));
            toUnit.add(new Option(unit, units[type][unit]));
        }
    }

    conversionType.addEventListener('change', populateUnits);

    convertBtn.addEventListener('click', function() {
        const val = parseFloat(inputValue.value);
        if (isNaN(val)) {
            resultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        const from = parseFloat(fromUnit.value);
        const to = parseFloat(toUnit.value);

        const result = (val * from) / to;
        resultDiv.textContent = `${val} ${fromUnit.options[fromUnit.selectedIndex].text} = ${result.toFixed(4)} ${toUnit.options[toUnit.selectedIndex].text}`;
    });

    // Initial population
    populateUnits();
});
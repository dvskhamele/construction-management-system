
function convert() {
    const value = parseFloat(document.getElementById('value-input').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(value)) {
        resultDiv.innerText = 'Please enter a valid number.';
        return;
    }

    let convertedValue;

    // Conversion factors (simplified for common construction units)
    const conversionFactors = {
        feet: {
            meters: 0.3048
        },
        meters: {
            feet: 3.28084
        },
        sq_feet: {
            sq_meters: 0.092903
        },
        sq_meters: {
            sq_feet: 10.7639
        },
        cubic_yards: {
            cubic_meters: 0.764555
        },
        cubic_meters: {
            cubic_yards: 1.30795
        }
    };

    // Check if direct conversion exists
    if (conversionFactors[fromUnit] && conversionFactors[fromUnit][toUnit]) {
        convertedValue = value * conversionFactors[fromUnit][toUnit];
    } else if (fromUnit === toUnit) {
        convertedValue = value; // Same unit
    } else {
        resultDiv.innerText = 'Conversion not supported for these units.';
        return;
    }

    resultDiv.innerText = `${value} ${fromUnit.replace('_', ' ')} is ${convertedValue.toFixed(4)} ${toUnit.replace('_', ' ')}`;
}

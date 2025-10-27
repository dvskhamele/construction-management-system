
document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const valueToConvert = parseFloat(document.getElementById('value-to-convert').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;

    if (isNaN(valueToConvert)) {
        alert("Please enter a valid number to convert.");
        return;
    }

    let convertedValue;
    let unitCategory = '';

    // Determine unit category
    if (['feet', 'meters', 'inches', 'cm'].includes(fromUnit)) unitCategory = 'length';
    else if (['sq-feet', 'sq-meters', 'acres'].includes(fromUnit)) unitCategory = 'area';
    else if (['cu-feet', 'cu-meters', 'cu-yards', 'gallons', 'liters'].includes(fromUnit)) unitCategory = 'volume';
    else if (['lbs', 'kg'].includes(fromUnit)) unitCategory = 'weight';

    if (!unitCategory || !(['feet', 'meters', 'inches', 'cm'].includes(toUnit) && unitCategory === 'length') &&
        !(['sq-feet', 'sq-meters', 'acres'].includes(toUnit) && unitCategory === 'area') &&
        !(['cu-feet', 'cu-meters', 'cu-yards', 'gallons', 'liters'].includes(toUnit) && unitCategory === 'volume') &&
        !(['lbs', 'kg'].includes(toUnit) && unitCategory === 'weight')) {
        alert("Please select compatible units for conversion.");
        return;
    }

    // Convert to a base unit first, then to the target unit
    let baseValue;

    // Convert FROM unit to a common base unit (e.g., feet for length, sq ft for area, cu ft for volume, lbs for weight)
    switch (fromUnit) {
        case 'feet': baseValue = valueToConvert; break;
        case 'meters': baseValue = valueToConvert * 3.28084; break; // meters to feet
        case 'inches': baseValue = valueToConvert / 12; break; // inches to feet
        case 'cm': baseValue = valueToConvert * 0.0328084; break; // cm to feet

        case 'sq-feet': baseValue = valueToConvert; break;
        case 'sq-meters': baseValue = valueToConvert * 10.7639; break; // sq meters to sq feet
        case 'acres': baseValue = valueToConvert * 43560; break; // acres to sq feet

        case 'cu-feet': baseValue = valueToConvert; break;
        case 'cu-meters': baseValue = valueToConvert * 35.3147; break; // cu meters to cu feet
        case 'cu-yards': baseValue = valueToConvert * 27; break; // cu yards to cu feet
        case 'gallons': baseValue = valueToConvert / 7.48052; break; // gallons to cu feet
        case 'liters': baseValue = valueToConvert / 28.3168; break; // liters to cu feet

        case 'lbs': baseValue = valueToConvert; break;
        case 'kg': baseValue = valueToConvert * 2.20462; break; // kg to lbs
    }

    // Convert from base unit to TO unit
    switch (toUnit) {
        case 'feet': convertedValue = baseValue; break;
        case 'meters': convertedValue = baseValue / 3.28084; break;
        case 'inches': convertedValue = baseValue * 12; break;
        case 'cm': convertedValue = baseValue / 0.0328084; break;

        case 'sq-feet': convertedValue = baseValue; break;
        case 'sq-meters': convertedValue = baseValue / 10.7639; break;
        case 'acres': convertedValue = baseValue / 43560; break;

        case 'cu-feet': convertedValue = baseValue; break;
        case 'cu-meters': convertedValue = baseValue / 35.3147; break;
        case 'cu-yards': convertedValue = baseValue / 27; break;
        case 'gallons': convertedValue = baseValue * 7.48052; break;
        case 'liters': convertedValue = baseValue * 28.3168; break;

        case 'lbs': convertedValue = baseValue; break;
        case 'kg': convertedValue = baseValue / 2.20462; break;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>${valueToConvert.toFixed(2)} ${fromUnit} is equal to <strong>${convertedValue.toFixed(4)} ${toUnit}</strong></p>
    `;
});

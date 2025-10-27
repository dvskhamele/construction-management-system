
document.addEventListener('DOMContentLoaded', () => {
    const materialSelect = document.getElementById('material');
    const quantityInput = document.getElementById('quantity');
    const unitSelect = document.getElementById('unit');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    // Embodied carbon coefficients (kg CO2e per unit)
    // Source: The Inventory of Carbon and Energy (ICE) database
    const embodiedCarbonCoefficients = {
        concrete: { // per m³
            coefficient: 450, // Approximate value for 3000 psi concrete
            unit: 'm3'
        },
        steel: { // per kg
            coefficient: 1.37, // Approximate value for rebar
            unit: 'kg'
        },
        wood: { // per m³
            coefficient: -800, // Approximate value for dimensional lumber (sequesters carbon)
            unit: 'm3'
        },
        brick: { // per kg
            coefficient: 0.24, // Approximate value for common brick
            unit: 'kg'
        }
    };

    calculateButton.addEventListener('click', () => {
        const material = materialSelect.value;
        const quantity = parseFloat(quantityInput.value);
        const unit = unitSelect.value;

        if (isNaN(quantity) || quantity <= 0) {
            resultDiv.textContent = 'Please enter a valid quantity.';
            return;
        }

        const materialData = embodiedCarbonCoefficients[material];
        if (materialData.unit !== unit) {
            resultDiv.textContent = `Please use the correct unit for ${material} (${materialData.unit}).`;
            return;
        }

        const embodiedCarbon = quantity * materialData.coefficient;
        resultDiv.textContent = `Estimated Embodied Carbon: ${embodiedCarbon.toFixed(2)} kg CO2e`;
    });
});

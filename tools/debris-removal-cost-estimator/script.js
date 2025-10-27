
document.addEventListener('DOMContentLoaded', () => {
    const debrisTypeSelect = document.getElementById('debris-type');
    const volumeInput = document.getElementById('volume');
    const haulingDistanceInput = document.getElementById('hauling-distance');
    const estimateButton = document.getElementById('estimate-cost');
    const resultDiv = document.getElementById('result');

    // Cost factors (approximate values)
    const costFactors = {
        concrete: {
            costPerYard: 150,
            disposalFee: 50
        },
        wood: {
            costPerYard: 100,
            disposalFee: 30
        },
        drywall: {
            costPerYard: 120,
            disposalFee: 40
        },
        mixed: {
            costPerYard: 180,
            disposalFee: 60
        }
    };

    const costPerMile = 2.5; // Per mile hauling cost

    estimateButton.addEventListener('click', () => {
        const debrisType = debrisTypeSelect.value;
        const volume = parseFloat(volumeInput.value);
        const haulingDistance = parseFloat(haulingDistanceInput.value);

        if (isNaN(volume) || volume <= 0) {
            resultDiv.textContent = 'Please enter a valid volume.';
            return;
        }

        if (isNaN(haulingDistance) || haulingDistance < 0) {
            resultDiv.textContent = 'Please enter a valid hauling distance.';
            return;
        }

        const materialCost = costFactors[debrisType].costPerYard * volume;
        const disposalCost = costFactors[debrisType].disposalFee * volume;
        const haulingCost = haulingDistance * costPerMile;

        const totalCost = materialCost + disposalCost + haulingCost;

        resultDiv.textContent = `Estimated Debris Removal Cost: $${totalCost.toFixed(2)}`;
    });
});

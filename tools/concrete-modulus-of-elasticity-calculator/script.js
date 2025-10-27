
document.addEventListener('DOMContentLoaded', function() {
    const concreteTypeSelect = document.getElementById('concrete-type');
    const densityInputGroup = document.getElementById('density-input-group');
    const concreteDensityInput = document.getElementById('concrete-density');

    function toggleDensityInput() {
        if (concreteTypeSelect.value === 'lightweight') {
            densityInputGroup.style.display = 'block';
            concreteDensityInput.setAttribute('required', 'true');
        } else {
            densityInputGroup.style.display = 'none';
            concreteDensityInput.removeAttribute('required');
        }
    }

    concreteTypeSelect.addEventListener('change', toggleDensityInput);
    toggleDensityInput(); // Set initial state

    document.getElementById('modulus-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const compressiveStrength = parseFloat(document.getElementById('compressive-strength').value);
        const concreteType = concreteTypeSelect.value;
        let concreteDensity = 0;

        if (concreteType === 'lightweight') {
            concreteDensity = parseFloat(concreteDensityInput.value);
        }

        if (isNaN(compressiveStrength) || compressiveStrength <= 0) {
            alert("Please enter a valid positive number for compressive strength.");
            return;
        }
        if (concreteType === 'lightweight' && (isNaN(concreteDensity) || concreteDensity <= 0)) {
            alert("Please enter a valid positive number for concrete density for lightweight concrete.");
            return;
        }

        let modulusOfElasticity = 0;

        if (concreteType === 'normal-weight') {
            // ACI 318 formula for normal weight concrete: Ec = 57000 * sqrt(f'c)
            modulusOfElasticity = 57000 * Math.sqrt(compressiveStrength);
        } else { // lightweight
            // ACI 318 formula for lightweight concrete: Ec = w^1.5 * 33 * sqrt(f'c)
            modulusOfElasticity = Math.pow(concreteDensity, 1.5) * 33 * Math.sqrt(compressiveStrength);
        }

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3>Results:</h3>
            <p>Estimated Modulus of Elasticity (Ec): ${modulusOfElasticity.toFixed(0)} psi</p>
            <p class="note">Note: This calculation is based on ACI 318 guidelines. Always consult relevant codes and a structural engineer for critical design considerations.</p>
        `;
    });
});

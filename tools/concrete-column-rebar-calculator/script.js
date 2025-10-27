
document.addEventListener('DOMContentLoaded', function() {
    const columnTypeSelect = document.getElementById('column-type');
    const rectangularInputs = document.getElementById('rectangular-inputs');
    const cylindricalInputs = document.getElementById('cylindrical-inputs');

    function toggleInputs() {
        if (columnTypeSelect.value === 'rectangular') {
            rectangularInputs.style.display = 'block';
            cylindricalInputs.style.display = 'none';
            document.getElementById('rect-length').setAttribute('required', 'true');
            document.getElementById('rect-width').setAttribute('required', 'true');
            document.getElementById('cyl-diameter').removeAttribute('required');
        } else {
            rectangularInputs.style.display = 'none';
            cylindricalInputs.style.display = 'block';
            document.getElementById('cyl-diameter').setAttribute('required', 'true');
            document.getElementById('rect-length').removeAttribute('required');
            document.getElementById('rect-width').removeAttribute('required');
        }
    }

    columnTypeSelect.addEventListener('change', toggleInputs);
    toggleInputs(); // Set initial state

    document.getElementById('rebar-column-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const columnHeight = parseFloat(document.getElementById('column-height').value);
        const columnType = columnTypeSelect.value;
        const mainRebarSizeWeight = parseFloat(document.getElementById('main-rebar-size').value);
        const numMainRebars = parseFloat(document.getElementById('num-main-rebars').value);
        const tieRebarSizeWeight = parseFloat(document.getElementById('tie-rebar-size').value);
        const tieSpacing = parseFloat(document.getElementById('tie-spacing').value);

        if (isNaN(columnHeight) || isNaN(mainRebarSizeWeight) || isNaN(numMainRebars) || isNaN(tieRebarSizeWeight) || isNaN(tieSpacing) || columnHeight <= 0 || numMainRebars <= 0 || tieSpacing <= 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        let totalLengthMainRebar = columnHeight * numMainRebars;
        let totalWeightMainRebar = totalLengthMainRebar * mainRebarSizeWeight;

        let tiePerimeterInches = 0;
        const concreteCoverTies = 1.5; // inches

        if (columnType === 'rectangular') {
            const rectLength = parseFloat(document.getElementById('rect-length').value);
            const rectWidth = parseFloat(document.getElementById('rect-width').value);
            if (isNaN(rectLength) || isNaN(rectWidth) || rectLength <= 0 || rectWidth <= 0) {
                alert("Please enter valid positive numbers for rectangular column dimensions.");
                return;
            }
            // Perimeter of tie (inner dimensions)
            tiePerimeterInches = 2 * ((rectLength * 12) - (2 * concreteCoverTies)) + 2 * ((rectWidth * 12) - (2 * concreteCoverTies));
        } else { // cylindrical
            const cylDiameter = parseFloat(document.getElementById('cyl-diameter').value);
            if (isNaN(cylDiameter) || cylDiameter <= 0) {
                alert("Please enter a valid positive number for cylindrical column diameter.");
                return;
            }
            // Circumference of tie (inner diameter)
            tiePerimeterInches = Math.PI * ((cylDiameter * 12) - (2 * concreteCoverTies));
        }

        const numTies = Math.floor((columnHeight * 12) / tieSpacing) + 1;
        const totalLengthTieRebar = (tiePerimeterInches / 12) * numTies;
        const totalWeightTieRebar = totalLengthTieRebar * tieRebarSizeWeight;

        const totalRebarWeightForColumn = totalWeightMainRebar + totalWeightTieRebar;

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3>Results:</h3>
            <p>Total Length of Main Rebar: ${totalLengthMainRebar.toFixed(2)} feet</p>
            <p>Total Weight of Main Rebar: ${totalWeightMainRebar.toFixed(2)} lbs</p>
            <p>Total Length of Tie/Stirrup Rebar: ${totalLengthTieRebar.toFixed(2)} feet</p>
            <p>Total Weight of Tie/Stirrup Rebar: ${totalWeightTieRebar.toFixed(2)} lbs</p>
            <p><strong>Total Rebar Weight for Column: ${totalRebarWeightForColumn.toFixed(2)} lbs</strong></p>
            <p class="note">Note: This estimate includes main bars and ties/stirrups. It does not account for laps, bends, or waste. Always consult structural drawings and local codes.</p>
        `;
    });
});

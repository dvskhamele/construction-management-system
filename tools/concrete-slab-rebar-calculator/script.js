
document.getElementById('rebar-slab-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const slabLength = parseFloat(document.getElementById('slab-length').value);
    const slabWidth = parseFloat(document.getElementById('slab-width').value);
    const rebarSizeWeight = parseFloat(document.getElementById('rebar-size').value);
    const rebarSpacing = parseFloat(document.getElementById('rebar-spacing').value);

    if (isNaN(slabLength) || isNaN(slabWidth) || isNaN(rebarSizeWeight) || isNaN(rebarSpacing) || slabLength <= 0 || slabWidth <= 0 || rebarSpacing <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Calculate number of rebar pieces along the width (running the length of the slab)
    const numBarsAlongWidth = Math.floor((slabWidth * 12) / rebarSpacing) + 1;
    const lengthOfBarsAlongWidth = numBarsAlongWidth * slabLength;

    // Calculate number of rebar pieces along the length (running the width of the slab)
    const numBarsAlongLength = Math.floor((slabLength * 12) / rebarSpacing) + 1;
    const lengthOfBarsAlongLength = numBarsAlongLength * slabWidth;

    // Total length of rebar needed
    const totalRebarLength = lengthOfBarsAlongWidth + lengthOfBarsAlongLength;

    // Total weight of rebar
    const totalRebarWeight = totalRebarLength * rebarSizeWeight;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Total Length of Rebar: ${totalRebarLength.toFixed(2)} feet</p>
        <p>Estimated Total Weight of Rebar: ${totalRebarWeight.toFixed(2)} lbs</p>
        <p class="note">Note: This estimate is for main rebar in a rectangular slab. It does not account for waste, overlaps, or additional reinforcement like edge bars or corner bars. Always consult structural drawings and local codes.</p>
    `;
});

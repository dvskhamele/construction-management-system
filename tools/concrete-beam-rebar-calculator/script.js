
document.getElementById('rebar-beam-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const beamLength = parseFloat(document.getElementById('beam-length').value);
    const beamDepth = parseFloat(document.getElementById('beam-depth').value);
    const beamWidth = parseFloat(document.getElementById('beam-width').value);
    const mainRebarSizeWeight = parseFloat(document.getElementById('main-rebar-size').value);
    const numMainRebarsTop = parseFloat(document.getElementById('num-main-rebars-top').value);
    const numMainRebarsBottom = parseFloat(document.getElementById('num-main-rebars-bottom').value);
    const stirrupRebarSizeWeight = parseFloat(document.getElementById('stirrup-rebar-size').value);
    const stirrupSpacing = parseFloat(document.getElementById('stirrup-spacing').value);

    if (isNaN(beamLength) || isNaN(beamDepth) || isNaN(beamWidth) || isNaN(mainRebarSizeWeight) || isNaN(numMainRebarsTop) || isNaN(numMainRebarsBottom) || isNaN(stirrupRebarSizeWeight) || isNaN(stirrupSpacing) || beamLength <= 0 || beamDepth <= 0 || beamWidth <= 0 || numMainRebarsTop < 0 || numMainRebarsBottom < 0 || stirrupSpacing <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Main Rebar Calculation
    const totalMainRebars = numMainRebarsTop + numMainRebarsBottom;
    const totalLengthMainRebar = beamLength * totalMainRebars;
    const totalWeightMainRebar = totalLengthMainRebar * mainRebarSizeWeight;

    // Stirrup Calculation
    const concreteCoverStirrups = 1.5; // inches
    const stirrupWidthInches = beamWidth - (2 * concreteCoverStirrups);
    const stirrupDepthInches = beamDepth - (2 * concreteCoverStirrups);

    if (stirrupWidthInches <= 0 || stirrupDepthInches <= 0) {
        alert("Beam dimensions are too small for stirrups with given cover. Adjust beam size or cover.");
        return;
    }

    const stirrupPerimeterInches = 2 * (stirrupWidthInches + stirrupDepthInches);
    const numStirrups = Math.floor((beamLength * 12) / stirrupSpacing) + 1;
    const totalLengthStirrupRebar = (stirrupPerimeterInches / 12) * numStirrups;
    const totalWeightStirrupRebar = totalLengthStirrupRebar * stirrupRebarSizeWeight;

    const totalRebarWeightForBeam = totalWeightMainRebar + totalWeightStirrupRebar;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Total Length of Main Rebar: ${totalLengthMainRebar.toFixed(2)} feet</p>
        <p>Total Weight of Main Rebar: ${totalWeightMainRebar.toFixed(2)} lbs</p>
        <p>Total Length of Stirrup Rebar: ${totalLengthStirrupRebar.toFixed(2)} feet</p>
        <p>Total Weight of Stirrup Rebar: ${totalWeightStirrupRebar.toFixed(2)} lbs</p>
        <p><strong>Total Rebar Weight for Beam: ${totalRebarWeightForBeam.toFixed(2)} lbs</strong></p>
        <p class="note">Note: This estimate includes main bars and stirrups. It does not account for laps, bends, or waste. Always consult structural drawings and local codes.</p>
    `;
});

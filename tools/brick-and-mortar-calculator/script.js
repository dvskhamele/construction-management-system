
document.getElementById('brick-mortar-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const wallLength = parseFloat(document.getElementById('wall-length').value);
    const wallHeight = parseFloat(document.getElementById('wall-height').value);
    const brickLength = parseFloat(document.getElementById('brick-length').value);
    const brickHeight = parseFloat(document.getElementById('brick-height').value);
    const mortarThickness = parseFloat(document.getElementById('mortar-thickness').value);
    const wastePercentage = parseFloat(document.getElementById('waste-percentage').value);
    const mortarMixRatio = document.getElementById('mortar-mix-ratio').value;

    if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(brickLength) || isNaN(brickHeight) || isNaN(mortarThickness) || isNaN(wastePercentage) || wallLength <= 0 || wallHeight <= 0 || brickLength <= 0 || brickHeight <= 0 || mortarThickness < 0 || wastePercentage < 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // --- Brick Calculation ---
    const wallArea = wallLength * wallHeight; // sq ft

    const effectiveBrickLength = brickLength + mortarThickness; // inches
    const effectiveBrickHeight = brickHeight + mortarThickness; // inches

    const effectiveBrickLengthFt = effectiveBrickLength / 12;
    const effectiveBrickHeightFt = effectiveBrickHeight / 12;

    const effectiveBrickArea = effectiveBrickLengthFt * effectiveBrickHeightFt; // sq ft

    const bricksNeededRaw = wallArea / effectiveBrickArea;
    const bricksNeededWithWaste = Math.ceil(bricksNeededRaw * (1 + (wastePercentage / 100)));

    // --- Mortar Calculation ---
    const totalWallVolumeCubicFt = wallLength * wallHeight * (mortarThickness / 12); // Simplified: assuming mortar thickness is average wall thickness

    // More accurate mortar volume: Total wall volume - volume of bricks
    const brickVolumeCubicFt = (brickLength / 12) * (brickHeight / 12) * (brickLength / 12); // Volume of one brick (approx cube)
    const totalBrickVolumeInWall = bricksNeededRaw * brickVolumeCubicFt; // Total volume occupied by bricks

    let mortarVolumeCubicFt = totalWallVolumeCubicFt - totalBrickVolumeInWall;
    if (mortarVolumeCubicFt < 0) mortarVolumeCubicFt = 0.1 * totalWallVolumeCubicFt; // Fallback if calculation goes negative due to approximations

    const mortarVolumeWithWaste = mortarVolumeCubicFt * (1 + (wastePercentage / 100));

    // --- Mortar Mix Material Calculation ---
    let cementRatio, sandRatio;
    let sumOfRatios;

    switch (mortarMixRatio) {
        case '1:3': cementRatio = 1; sandRatio = 3; sumOfRatios = 4; break;
        case '1:4': cementRatio = 1; sandRatio = 4; sumOfRatios = 5; break;
        case '1:5': cementRatio = 1; sandRatio = 5; sumOfRatios = 6; break;
        case '1:6': cementRatio = 1; sandRatio = 6; sumOfRatios = 7; break;
        default: alert("Invalid mortar mix ratio selected."); return;
    }

    // Dry volume of materials for mortar is typically 1.25 times the wet volume
    const dryMaterialVolumeForMortar = mortarVolumeWithWaste * 1.25;

    const cementVolumeForMortar = (cementRatio / sumOfRatios) * dryMaterialVolumeForMortar;
    const sandVolumeForMortar = (sandRatio / sumOfRatios) * dryMaterialVolumeForMortar;

    const cementBagsForMortar = cementVolumeForMortar; // Simplified: 1 cubic foot cement ~ 1 bag

    const waterCementRatioMortar = 0.55; // Assuming a common water-cement ratio for mortar
    const waterWeightLbsForMortar = cementBagsForMortar * 94 * waterCementRatioMortar; // 94 lbs per cement bag
    const waterGallonsForMortar = waterWeightLbsForMortar / 8.34; // 1 gallon of water = 8.34 lbs

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Bricks Needed: ${bricksNeededWithWaste}</p>
        <p>Estimated Mortar Volume: ${mortarVolumeWithWaste.toFixed(2)} cubic feet</p>
        <p>Estimated Cement for Mortar: ${cementBagsForMortar.toFixed(2)} bags</p>
        <p>Estimated Sand for Mortar: ${sandVolumeForMortar.toFixed(2)} cubic feet</p>
        <p>Estimated Water for Mortar: ${waterGallonsForMortar.toFixed(2)} gallons</p>
        <p class="note">Note: This is an approximate calculation. Actual quantities may vary based on material properties, waste, and specific application techniques. Always consult with a professional.</p>
    `;
});

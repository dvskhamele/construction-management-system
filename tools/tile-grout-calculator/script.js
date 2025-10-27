
document.getElementById('grout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const tileLength = parseFloat(document.getElementById('tile-length').value);
    const tileWidth = parseFloat(document.getElementById('tile-width').value);
    const groutWidth = parseFloat(document.getElementById('grout-width').value);
    const areaToGrout = parseFloat(document.getElementById('area-to-grout').value);

    if (isNaN(tileLength) || isNaN(tileWidth) || isNaN(groutWidth) || isNaN(areaToGrout)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Convert tile dimensions to feet for consistency with area
    const tileLengthFt = tileLength / 12;
    const tileWidthFt = tileWidth / 12;
    const groutWidthFt = groutWidth / 12;

    // Calculate the number of tiles in the area
    const tileAreaSqFt = tileLengthFt * tileWidthFt;
    const numberOfTiles = areaToGrout / tileAreaSqFt;

    // Calculate the total length of grout lines
    // For a grid, total grout line length is approximately:
    // (Number of tiles in length * Grout width) + (Number of tiles in width * Grout width)
    // This is a simplification, a more accurate way is to consider perimeter of each tile
    // and then divide by 2 (since each line is shared by 2 tiles)

    // Simplified approach for grout factor per square foot
    // This factor is highly dependent on grout depth and density, which are not inputs here.
    // A common approximation for grout needed (in lbs) per sq ft for typical tiles and grout lines
    // is around 0.1 to 0.2 lbs/sq ft. Let's use a more direct calculation.

    // Calculate the perimeter of a single tile (where grout will be applied)
    const tilePerimeter = (tileLength + tileWidth) * 2; // in inches

    // Calculate the total length of grout lines for the given area
    // This is a rough estimate. A more precise calculation would involve
    // considering the number of tiles along each dimension.
    const totalGroutLineLength = numberOfTiles * tilePerimeter; // in inches

    // Assuming a standard grout depth of 1/4 inch (0.25 inches)
    const groutDepth = 0.25; // inches

    // Calculate the volume of grout needed (cubic inches)
    const groutVolumeCubicInches = totalGroutLineLength * groutWidth * groutDepth;

    // Convert cubic inches to cubic feet
    const groutVolumeCubicFeet = groutVolumeCubicInches / 1728; // 1728 cubic inches in 1 cubic foot

    // Approximate density of sanded grout is about 100 lbs/cubic foot
    const groutDensityLbsPerCubicFt = 100;

    const estimatedGroutLbs = groutVolumeCubicFeet * groutDensityLbsPerCubicFt;

    // Assuming a standard bag of grout is 25 lbs
    const standardBagSizeLbs = 25;
    const estimatedBags = Math.ceil(estimatedGroutLbs / standardBagSizeLbs);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Estimated Grout Needed: ${estimatedGroutLbs.toFixed(2)} lbs</p>
        <p>Estimated Grout Bags (25lb bags): ${estimatedBags}</p>
        <p class="note">Note: This is an estimate. Actual grout needed may vary based on waste, grout depth, and specific product density.</p>
    `;
});

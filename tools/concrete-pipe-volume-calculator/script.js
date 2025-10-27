
document.getElementById('pipe-volume-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const pipeLength = parseFloat(document.getElementById('pipe-length').value);
    const outerDiameter = parseFloat(document.getElementById('outer-diameter').value);
    const innerDiameter = parseFloat(document.getElementById('inner-diameter').value);

    if (isNaN(pipeLength) || isNaN(outerDiameter) || isNaN(innerDiameter) || pipeLength <= 0 || outerDiameter <= 0 || innerDiameter <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    if (innerDiameter >= outerDiameter) {
        alert("Inner diameter must be less than outer diameter.");
        return;
    }

    // Convert diameters from inches to feet
    const outerRadiusFt = (outerDiameter / 2) / 12;
    const innerRadiusFt = (innerDiameter / 2) / 12;

    // Calculate volume of outer cylinder in cubic feet
    const outerVolumeCubicFeet = Math.PI * outerRadiusFt * outerRadiusFt * pipeLength;

    // Calculate volume of inner cylinder (hollow part) in cubic feet
    const innerVolumeCubicFeet = Math.PI * innerRadiusFt * innerRadiusFt * pipeLength;

    // Concrete volume is the difference
    const concreteVolumeCubicFeet = outerVolumeCubicFeet - innerVolumeCubicFeet;

    // Convert cubic feet to cubic yards (1 cubic yard = 27 cubic feet)
    const concreteVolumeCubicYards = concreteVolumeCubicFeet / 27;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Volume of Concrete Needed: ${concreteVolumeCubicFeet.toFixed(2)} cubic feet</p>
        <p>Volume of Concrete Needed: ${concreteVolumeCubicYards.toFixed(2)} cubic yards</p>
    `;
});


function calculateVolume() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const depth = parseFloat(document.getElementById('depth').value);

    if (isNaN(length) || isNaN(width) || isNaN(depth) || length <= 0 || width <= 0 || depth <= 0) {
        document.getElementById('result').innerText = 'Please enter valid positive numbers for all dimensions.';
        return;
    }

    const volumeCubicFeet = length * width * depth;
    const volumeCubicYards = volumeCubicFeet / 27;

    document.getElementById('result').innerText = `Volume: ${volumeCubicFeet.toFixed(2)} cubic feet (${volumeCubicYards.toFixed(2)} cubic yards)`;
}

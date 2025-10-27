
function calculateThinset() {
    const area = parseFloat(document.getElementById('area').value);
    const trowelSize = parseFloat(document.getElementById('trowel').value);

    if (isNaN(area) || area <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid area.';
        return;
    }

    let coveragePerBag; // in square feet per 50lb bag

    if (trowelSize === 0.03125) { // 1/4" x 1/4"
        coveragePerBag = 90;
    } else if (trowelSize === 0.046875) { // 1/4" x 3/8"
        coveragePerBag = 70;
    } else if (trowelSize === 0.0625) { // 1/2" x 1/2"
        coveragePerBag = 45;
    }

    const bagsNeeded = area / coveragePerBag;

    document.getElementById('result').innerText = `You will need approximately ${bagsNeeded.toFixed(1)} bags (50lb) of thinset mortar.`;
}

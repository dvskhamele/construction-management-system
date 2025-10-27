
document.getElementById('right-angle-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let a = parseFloat(document.getElementById('side-a').value);
    let b = parseFloat(document.getElementById('side-b').value);
    let c = parseFloat(document.getElementById('side-c').value);

    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    let knownSides = 0;
    if (!isNaN(a)) knownSides++;
    if (!isNaN(b)) knownSides++;
    if (!isNaN(c)) knownSides++;

    if (knownSides !== 2) {
        alert("Please enter exactly two known side values.");
        return;
    }

    let result;
    if (isNaN(c)) { // Calculate C
        if (a <= 0 || b <= 0) {
            alert("Sides A and B must be positive.");
            return;
        }
        result = Math.sqrt(a * a + b * b);
        resultsDiv.innerHTML = `<h3>Results:</h3><p>Side C (Hypotenuse): ${result.toFixed(2)}</p>`;
    } else if (isNaN(a)) { // Calculate A
        if (b <= 0 || c <= 0) {
            alert("Sides B and C must be positive.");
            return;
        }
        if (b >= c) {
            alert("Side B must be shorter than Hypotenuse C.");
            return;
        }
        result = Math.sqrt(c * c - b * b);
        resultsDiv.innerHTML = `<h3>Results:</h3><p>Side A: ${result.toFixed(2)}</p>`;
    } else { // Calculate B
        if (a <= 0 || c <= 0) {
            alert("Sides A and C must be positive.");
            return;
        }
        if (a >= c) {
            alert("Side A must be shorter than Hypotenuse C.");
            return;
        }
        result = Math.sqrt(c * c - a * a);
        resultsDiv.innerHTML = `<h3>Results:</h3><p>Side B: ${result.toFixed(2)}</p>`;
    }
});

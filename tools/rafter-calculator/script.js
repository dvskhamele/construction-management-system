
function calculateRafter() {
    const run = parseFloat(document.getElementById('run').value);
    const pitch = parseFloat(document.getElementById('pitch').value);

    if (isNaN(run) || isNaN(pitch) || run <= 0 || pitch <= 0) {
        document.getElementById('result').innerText = 'Please enter valid positive numbers for run and pitch.';
        return;
    }

    const rise = (run / 12) * pitch;
    const rafterLength = Math.sqrt(Math.pow(run, 2) + Math.pow(rise, 2));

    document.getElementById('result').innerText = `Rafter Length: ${rafterLength.toFixed(2)} inches`;
}

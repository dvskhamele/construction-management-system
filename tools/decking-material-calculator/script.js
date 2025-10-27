
document.getElementById('decking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const deckWidth = parseFloat(document.getElementById('deck-width').value);
    const deckLength = parseFloat(document.getElementById('deck-length').value);
    const boardWidth = parseFloat(document.getElementById('board-width').value);
    const boardLength = parseFloat(document.getElementById('board-length').value);
    const joistSpacing = parseFloat(document.getElementById('joist-spacing').value);

    if (isNaN(deckWidth) || isNaN(deckLength) || isNaN(boardWidth) || isNaN(boardLength) || isNaN(joistSpacing)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate deck boards needed
    const deckArea = deckWidth * deckLength;
    const boardArea = (boardWidth / 12) * boardLength; // Convert board width to feet
    const boardsNeeded = Math.ceil(deckArea / boardArea);

    // Calculate joists needed (assuming simple rectangular deck, no cantilevers)
    // Joists run along the shorter dimension, spaced along the longer dimension
    const numJoists = Math.ceil((deckLength * 12) / joistSpacing) + 1; // +1 for the end joist

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Deck Area: ${deckArea.toFixed(2)} sq. ft.</p>
        <p>Deck Boards Needed: ${boardsNeeded}</p>
        <p>Joists Needed: ${numJoists}</p>
    `;
});

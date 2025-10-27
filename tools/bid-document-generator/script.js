
document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    const projectNameInput = document.getElementById('project-name');
    const clientNameInput = document.getElementById('client-name');
    const scopeOfWorkInput = document.getElementById('scope-of-work');
    const costBreakdownInput = document.getElementById('cost-breakdown');
    const totalCostInput = document.getElementById('total-cost');
    const generateBidButton = document.getElementById('generate-bid');
    const bidOutput = document.getElementById('bid-output');

    generateBidButton.addEventListener('click', () => {
        const projectName = projectNameInput.value;
        const clientName = clientNameInput.value;
        const scopeOfWork = scopeOfWorkInput.value;
        const costBreakdown = costBreakdownInput.value;
        const totalCost = totalCostInput.value;

        if (!projectName || !clientName || !scopeOfWork || !costBreakdown || !totalCost) {
            alert('Please fill in all fields.');
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text('Construction Bid Proposal', 20, 20);

        doc.setFontSize(16);
        doc.text(`Project: ${projectName}`, 20, 40);
        doc.text(`Client: ${clientName}`, 20, 50);

        doc.setFontSize(12);
        doc.text('Scope of Work:', 20, 70);
        doc.text(scopeOfWork, 20, 80, { maxWidth: 170 });

        doc.text('Cost Breakdown:', 20, 120);
        doc.text(costBreakdown, 20, 130, { maxWidth: 170 });

        doc.setFontSize(16);
        doc.text(`Total Cost: $${totalCost}`, 20, 180);

        doc.save(`${projectName.replace(/\s+/g, '-')}-bid.pdf`);

        bidOutput.innerHTML = `<p>Your bid document has been generated and downloaded as a PDF.</p>`;
    });
});

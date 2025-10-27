
const inspectionItems = [];

document.getElementById('addItemBtn').addEventListener('click', function() {
    const itemText = document.getElementById('inspectionItem').value;

    if (!itemText) {
        alert('Please enter an inspection item.');
        return;
    }

    inspectionItems.push(itemText);
    renderItemsList();
    document.getElementById('inspectionItem').value = '';
});

document.getElementById('generateChecklistBtn').addEventListener('click', function() {
    if (inspectionItems.length === 0) {
        alert('Please add some inspection items first.');
        return;
    }
    generateChecklist();
});

function renderItemsList() {
    const itemsListUl = document.getElementById('items');
    itemsListUl.innerHTML = '';
    inspectionItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item}</span>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        itemsListUl.appendChild(li);
    });
}

function removeItem(index) {
    inspectionItems.splice(index, 1);
    renderItemsList();
}

function generateChecklist() {
    const checklistOutput = document.getElementById('checklistOutput');
    let checklistHTML = '<h2>Site Inspection Checklist</h2>';
    checklistHTML += '<ul>';
    inspectionItems.forEach(item => {
        checklistHTML += `<li><input type="checkbox"> ${item}</li>`;
    });
    checklistHTML += '</ul>';

    checklistOutput.innerHTML = checklistHTML;

    const printButton = document.createElement('button');
    printButton.textContent = 'Print Checklist';
    printButton.style.marginTop = '20px';
    printButton.addEventListener('click', function() {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Site Inspection Checklist</title>');
        printWindow.document.write('<style>body{font-family:Arial,sans-serif;} ul{list-style:none;padding:0;} li{margin-bottom:10px;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(checklistHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });
    checklistOutput.appendChild(printButton);
}


document.addEventListener('DOMContentLoaded', () => {
    const itemNameInput = document.getElementById('item-name');
    const itemQuantityInput = document.getElementById('item-quantity');
    const addItemButton = document.getElementById('add-item');
    const inventoryList = document.getElementById('inventory-list');
    const clearInventoryButton = document.getElementById('clear-inventory');

    let inventory = [];

    // Load inventory from storage
    chrome.storage.sync.get(['toolInventory'], (result) => {
        if (result.toolInventory) {
            inventory = result.toolInventory;
            renderInventory();
        }
    });

    addItemButton.addEventListener('click', () => {
        const name = itemNameInput.value.trim();
        const quantity = parseInt(itemQuantityInput.value);

        if (name && !isNaN(quantity) && quantity > 0) {
            inventory.push({ name, quantity });
            chrome.storage.sync.set({ toolInventory: inventory }, () => {
                itemNameInput.value = '';
                itemQuantityInput.value = '';
                renderInventory();
            });
        }
    });

    clearInventoryButton.addEventListener('click', () => {
        chrome.storage.sync.clear(() => {
            inventory = [];
            renderInventory();
        });
    });

    function renderInventory() {
        inventoryList.innerHTML = '';
        if (inventory.length === 0) {
            inventoryList.innerHTML = '<p>No items in inventory.</p>';
            return;
        }
        inventory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';

            const itemText = document.createElement('span');
            itemText.textContent = `${item.name} (Qty: ${item.quantity})`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                inventory.splice(index, 1);
                chrome.storage.sync.set({ toolInventory: inventory }, renderInventory);
            });

            itemDiv.appendChild(itemText);
            itemDiv.appendChild(removeButton);
            inventoryList.appendChild(itemDiv);
        });
    }
});

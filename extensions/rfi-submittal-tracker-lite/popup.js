
document.addEventListener('DOMContentLoaded', () => {
    const itemDescriptionInput = document.getElementById('item-description');
    const itemTypeSelect = document.getElementById('item-type');
    const itemStatusSelect = document.getElementById('item-status');
    const addItemButton = document.getElementById('add-item');
    const trackerList = document.getElementById('tracker-list');
    const clearTrackerButton = document.getElementById('clear-tracker');

    let trackerItems = [];

    // Load items from storage
    chrome.storage.sync.get(['rfiSubmittalTracker'], (result) => {
        if (result.rfiSubmittalTracker) {
            trackerItems = result.rfiSubmittalTracker;
            renderTrackerItems();
        }
    });

    addItemButton.addEventListener('click', () => {
        const description = itemDescriptionInput.value.trim();
        const type = itemTypeSelect.value;
        const status = itemStatusSelect.value;
        const timestamp = new Date().toLocaleString();

        if (description) {
            trackerItems.push({ description, type, status, timestamp });
            chrome.storage.sync.set({ rfiSubmittalTracker: trackerItems }, () => {
                itemDescriptionInput.value = '';
                renderTrackerItems();
            });
        }
    });

    clearTrackerButton.addEventListener('click', () => {
        chrome.storage.sync.clear(() => {
            trackerItems = [];
            renderTrackerItems();
        });
    });

    function renderTrackerItems() {
        trackerList.innerHTML = '';
        if (trackerItems.length === 0) {
            trackerList.innerHTML = '<p>No RFI/Submittal items tracked yet.</p>';
            return;
        }
        trackerItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'tracker-item';

            const descriptionSpan = document.createElement('strong');
            descriptionSpan.textContent = item.description;

            const typeSpan = document.createElement('span');
            typeSpan.textContent = `Type: ${item.type}`;

            const statusSpan = document.createElement('span');
            statusSpan.className = `status status-${item.status}`;
            statusSpan.textContent = `Status: ${item.status}`;

            const timestampSpan = document.createElement('span');
            timestampSpan.textContent = `Logged: ${item.timestamp}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                trackerItems.splice(index, 1);
                chrome.storage.sync.set({ rfiSubmittalTracker: trackerItems }, renderTrackerItems);
            });

            itemDiv.appendChild(descriptionSpan);
            itemDiv.appendChild(typeSpan);
            itemDiv.appendChild(statusSpan);
            itemDiv.appendChild(timestampSpan);
            itemDiv.appendChild(removeButton);
            trackerList.appendChild(itemDiv);
        });
    }
});

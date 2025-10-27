
document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    const linkNameInput = document.getElementById('link-name');
    const linkUrlInput = document.getElementById('link-url');
    const addLinkButton = document.getElementById('add-link');

    let links = [];

    // Load links from storage
    chrome.storage.sync.get(['quickLinks'], (result) => {
        if (result.quickLinks) {
            links = result.quickLinks;
            renderLinks();
        }
    });

    addLinkButton.addEventListener('click', () => {
        const name = linkNameInput.value.trim();
        const url = linkUrlInput.value.trim();

        if (name && url) {
            links.push({ name, url });
            chrome.storage.sync.set({ quickLinks: links }, () => {
                linkNameInput.value = '';
                linkUrlInput.value = '';
                renderLinks();
            });
        }
    });

    function renderLinks() {
        linksContainer.innerHTML = '';
        links.forEach((link, index) => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';

            const linkAnchor = document.createElement('a');
            linkAnchor.href = link.url;
            linkAnchor.textContent = link.name;
            linkAnchor.target = '_blank'; // Open in new tab

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                links.splice(index, 1);
                chrome.storage.sync.set({ quickLinks: links }, renderLinks);
            });

            linkItem.appendChild(linkAnchor);
            linkItem.appendChild(removeButton);
            linksContainer.appendChild(linkItem);
        });
    }
});

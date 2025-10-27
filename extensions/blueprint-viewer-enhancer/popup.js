
document.addEventListener('DOMContentLoaded', () => {
    const enableButton = document.getElementById('enable-annotation');
    const disableButton = document.getElementById('disable-annotation');

    enableButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    // Check if content.js is already running and has the function
                    if (typeof enableAnnotation === 'function') {
                        enableAnnotation();
                    } else {
                        // If not, inject content.js and then call enableAnnotation
                        chrome.scripting.executeScript({
                            target: { tabId: tabs[0].id },
                            files: ['content.js'],
                        }, () => {
                            chrome.tabs.sendMessage(tabs[0].id, { action: 'enableAnnotation' });
                        });
                    }
                },
            });
        });
    });

    disableButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    if (typeof disableAnnotation === 'function') {
                        disableAnnotation();
                    }
                },
            });
        });
    });
});


// content.js

let isAnnotating = false;
let startX, startY;
let currentRect = null;

function enableAnnotation() {
    isAnnotating = true;
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    console.log("Annotation enabled");
}

function disableAnnotation() {
    isAnnotating = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    if (currentRect) {
        currentRect.remove();
        currentRect = null;
    }
    console.log("Annotation disabled");
}

function handleMouseDown(e) {
    if (!isAnnotating || e.button !== 0) return; // Only left click

    startX = e.clientX;
    startY = e.clientY;

    currentRect = document.createElement('div');
    currentRect.style.position = 'absolute';
    currentRect.style.border = '2px solid red';
    currentRect.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    currentRect.style.zIndex = '99999';
    document.body.appendChild(currentRect);

    currentRect.style.left = `${startX}px`;
    currentRect.style.top = `${startY}px`;
    currentRect.style.width = '0px';
    currentRect.style.height = '0px';
}

function handleMouseMove(e) {
    if (!isAnnotating || !currentRect) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    const newLeft = Math.min(startX, currentX);
    const newTop = Math.min(startY, currentY);

    currentRect.style.left = `${newLeft}px`;
    currentRect.style.top = `${newTop}px`;
    currentRect.style.width = `${width}px`;
    currentRect.style.height = `${height}px`;
}

function handleMouseUp(e) {
    if (!isAnnotating || !currentRect) return;

    // Optionally, save the annotation data here
    console.log("Annotation drawn:", {
        left: currentRect.style.left,
        top: currentRect.style.top,
        width: currentRect.style.width,
        height: currentRect.style.height
    });

    currentRect = null;
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "enableAnnotation") {
        enableAnnotation();
        sendResponse({ status: "Annotation enabled" });
    } else if (request.action === "disableAnnotation") {
        disableAnnotation();
        sendResponse({ status: "Annotation disabled" });
    }
});

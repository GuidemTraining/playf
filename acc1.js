// Function to toggle accordion content
function toggleAccordion(accordionId) {
    const accordionContent = document.getElementById(accordionId);
    if (accordionContent) {
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null; // Collapse the accordion
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; // Expand the accordion
        }
    }
}

// Function to check if an accordion is locked
function isAccordionLocked(accordionId) {
    const accordionButton = document.querySelector(`[data-target="${accordionId}"]`);
    return accordionButton.classList.contains('locked');
}

// Add click event listeners to accordion buttons
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function () {
        const accordionId = this.dataset.target;

        if (!isAccordionLocked(accordionId)) {
            toggleAccordion(accordionId);
        }
    });
});

// Initially expand the first unlocked accordion
const unlockedAccordion = document.querySelector('.accordion-button:not(.locked)');
if (unlockedAccordion) {
    const accordionId = unlockedAccordion.dataset.target;
    toggleAccordion(accordionId);
}

// Observer to handle DOM changes
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
            // Delay to ensure that the DOM has updated
            setTimeout(reloadGuidemButtonHandlers, 1000);
        }
    });
});

// Configuration for the observer
const config = { childList: true, subtree: true };

// Start observing the document body
observer.observe(document.body, config);

// Reload button handler
const reloadButton = document.getElementById('reload-button');
if (reloadButton) {
    reloadButton.addEventListener('click', function () {
        reloadGuidemButtonHandlers();
    });
}

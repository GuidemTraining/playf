// Function to toggle accordion content
function toggleAccordion(accordionId) {
    const accordionContent = document.getElementById(accordionId);
    if (accordionContent) {
        accordionContent.style.display = accordionContent.style.display === 'none' ? 'block' : 'none';
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

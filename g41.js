function handleButtonClick(button) {
    // Extract the numeric part of the button ID
    const suffix = button.id.match(/\d+$/)[0]; // This will match the number at the end of the ID
    const inputId = 'gflag-input' + suffix;
    const input = document.getElementById(inputId);
    if (input) {
        alert('Button ' + button.id + ' clicked. Input value: ' + input.value);
        // Here you can add your form submission logic
    }
}

function addEventListenersToAllButtons() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(function(button) {
        if (!button.eventAdded) {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the form from submitting
                handleButtonClick(button);
            });
            button.eventAdded = true;
            console.log("Event listener added to:", button.id);
        }
    });
}

// Reapply event listeners whenever needed
function reapplyEventListeners() {
    addEventListenersToAllButtons();
}

// MutationObserver to handle dynamically added buttons
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('guidem-button')) {
                reapplyEventListeners();
            }
        });
    });
});

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });

// Reapply event listeners when the content is loaded
document.addEventListener('DOMContentLoaded', reapplyEventListeners);

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', reapplyEventListeners);
}

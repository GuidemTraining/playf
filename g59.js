function buttonClickHandler(event) {
    const button = event.currentTarget;
    const formId = button.id.replace("submit-button", "gflag-form");
    const form = document.getElementById(formId);
    if (form) {
        const input = form.querySelector('input[type="text"]');
        if (input) {
            displayAlert(`Button clicked! You entered: ${input.value}`, 'green');
        }
    }
}

function addEventToGuidemButtons() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(button => {
        // Remove any existing event listeners to avoid duplicates
        button.removeEventListener('click', buttonClickHandler);
        // Add the event listener again
        button.addEventListener('click', buttonClickHandler);
    });
    console.log("Events (re)added to buttons with class 'guidem-button'");
    return buttons.length > 0; // Return true if buttons were found and events were added
}

function displayAlert(message, color) {
    // Customize and display your alert here
    alert(message);
}

function reloadEventHandlers() {
    // Triggered to reload event handlers
    addEventToGuidemButtons();
}

// Custom event to trigger reloading of event handlers
document.addEventListener('reloadEventHandlers', reloadEventHandlers);

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentWillChange', function (data) {
        // Trigger the custom event to reload event handlers when content will change
        document.dispatchEvent(new Event('reloadEventHandlers'));

        // You can also add other logic here if needed before content changes
    });

    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        // Trigger the custom event to reload event handlers when content did change
        document.dispatchEvent(new Event('reloadEventHandlers'));

        // You can also add other logic here if needed after content changes
    });
}

// Initialize the process for buttons with class 'guidem-button'
addEventToGuidemButtons();

// Event listener for page load (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function () {
    // Trigger the custom event to reload event handlers when the page is first loaded
    document.dispatchEvent(new Event('reloadEventHandlers'));
});

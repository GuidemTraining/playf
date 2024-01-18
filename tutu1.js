$(document).ready(function () {
    function buttonClickHandler(event) {
        const button = event.currentTarget;
        const formId = button.id.replace("submit-button", "gflag-form");
        const form = document.getElementById(formId);
        if (form) {
            const input = form.querySelector('input[type="text"]');
            if (input) {
                // Display an alert with the input value
                alert(`Button clicked! You entered: ${input.value}`);
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

    // Custom function to reload event handlers for .guidem-button elements
    function reloadGuidemButtonHandlers() {
        // Remove existing event listeners
        $('.guidem-button').off('click', buttonClickHandler);
        // Add event listeners again
        addEventToGuidemButtons();
    }

    // Your triggers or events that require reloading the event handlers
    // Example trigger:
    $('#reload-button').on('click', function () {
        reloadGuidemButtonHandlers();
    });

    // Initial load of event handlers
    addEventToGuidemButtons();

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            // Trigger a reload of event handlers when CoursePlayer content changes
            reloadGuidemButtonHandlers();
        });
    }
});

// Use window.onload for additional reliability in SPA
window.onload = function () {
    // Call your custom initialization logic here
    console.log("Window has fully loaded.");
};

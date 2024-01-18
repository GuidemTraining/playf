// JavaScript code for handling form submissions and creating custom notifications
document.addEventListener("DOMContentLoaded", function () {
    // Function to handle button click event
    function buttonClickHandler(event) {
        const button = event.currentTarget;
        const formId = button.id.replace("submit-button", "gflag-form");
        const form = document.getElementById(formId);
        if (form) {
            const input = form.querySelector('input[type="text"]');
            if (input) {
                // Display a custom notification
                createCustomNotification(`You entered: ${input.value}`);
            }
        }
    }

    // Function to add event listeners to guidem buttons
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
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.removeEventListener('click', buttonClickHandler);
        });
        // Add event listeners again
        addEventToGuidemButtons();
    }

    // Your triggers or events that require reloading the event handlers
    // Example trigger:
    const reloadButton = document.getElementById('reload-button');
    if (reloadButton) {
        reloadButton.addEventListener('click', function () {
            reloadGuidemButtonHandlers();
        });
    }

    // Initial load of event handlers
    addEventToGuidemButtons();
    
    // Function to create a custom notification
    function createCustomNotification(message) {
        const notificationContainer = document.createElement('div');
        notificationContainer.classList.add('custom-notification');
        notificationContainer.textContent = message;
        document.body.appendChild(notificationContainer);

        setTimeout(() => {
            notificationContainer.remove();
        }, 5000); // Remove notification after 5 seconds
    }

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            // Trigger a reload of event handlers when CoursePlayer content changes
            reloadGuidemButtonHandlers();
        });
    }
});

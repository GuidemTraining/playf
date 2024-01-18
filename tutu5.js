// JavaScript code for handling form submissions and creating custom notifications
$(document).ready(function () {
    // Function to display a custom notification
    function showCustomNotification(message, duration) {
        const notification = document.getElementById('custom-notification');
        notification.textContent = message;
        notification.style.display = 'block';
        console.log(`Notification displayed: ${message}`); // Debug statement
        setTimeout(function () {
            notification.style.display = 'none';
            console.log('Notification hidden'); // Debug statement
        }, duration);
    }

    // Function to handle button click event
    function buttonClickHandler(event) {
        const button = event.currentTarget;
        const formId = button.id.replace("submit-button", "gflag-form");
        const form = document.getElementById(formId);
        if (form) {
            const input = form.querySelector('input[type="text"]');
            if (input) {
                // Display a custom notification with the input value
                const inputValue = input.value;
                showCustomNotification(`Button clicked! You entered: ${inputValue}`, 3000); // 3 seconds duration
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
            console.log(`Event added to button: ${button.id}`); // Debug statement
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
            console.log(`Event removed from button: ${button.id}`); // Debug statement
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
            console.log('Event handlers reloaded'); // Debug statement
        });
    }

    // Initial load of event handlers
    addEventToGuidemButtons();

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            // Trigger a reload of event handlers when CoursePlayer content changes
            reloadGuidemButtonHandlers();
            console.log('CoursePlayer content changed'); // Debug statement
        });
    }

    // Use window.onload for additional reliability in SPA
    window.onload = function () {
        // Call your custom initialization logic here
        console.log("Window has fully loaded.");
    };

    // Function to display a custom notification with animation
    function showCustomNotification(message, duration) {
        const notification = document.getElementById('custom-notification');
        notification.textContent = message;
        notification.style.display = 'block';
        notification.style.animation = 'fadeInOut 3s forwards'; // Apply your animation here

        setTimeout(function () {
            notification.style.animation = '';
            notification.style.display = 'none';
        }, duration);
    }
});

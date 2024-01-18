$(document).ready(function () {
    reloadGuidemButtonHandlers();
    addEventToGuidemButtons();
    const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3', 'GOODMODE4', 'GOODMODE5', 'GOODMODE6', 'GOODMODE7', 'GOODMODE8', 'GOODMODE9', 'GOODMODE10'];

    // Function to display a custom notification with animation
    function showCustomNotification(message, duration, color) {
        const notification = document.getElementById('custom-notification');
        notification.innerHTML = message;
        notification.style.display = 'block';
        notification.style.backgroundColor = color;
        notification.style.animation = 'fadeInOut 5s forwards';

        setTimeout(function () {
            notification.style.animation = '';
            notification.style.display = 'none';
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
                // Get the input value
                const inputValue = input.value;
                // Check if the input value is in the list of correct answers
                if (correctAnswers.includes(inputValue)) {
                    // Disable the input field
                    input.disabled = true;
                    input.style.color = '#888';
                    // Change the button text to "Completed"
                    button.textContent = 'Completed';
                    // Set button color to green
                    
                    button.style.backgroundColor = '#00cc00';
                    // Show a notification with a checkmark image
                    showCustomNotification('<img src="checkmark.png" alt="Correct">', 3000, '#00cc00');
                } else {
                    // Show a notification with an X mark image
                    showCustomNotification('<img src="xmark.png" alt="Incorrect">', 3000, 'red');
                    // Change the button color to red for 2 seconds
                    button.style.backgroundColor = 'red';
                    setTimeout(function () {
                        button.style.backgroundColor = '#0056b3';
                    }, 2000);
                }
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
            console.log(`Event added to button: ${button.id}`);
        });
        console.log("Events (re)added to buttons with class 'guidem-button'");
        return buttons.length > 0;
    }

    // Custom function to reload event handlers for .guidem-button elements
    function reloadGuidemButtonHandlers() {
        // Remove existing event listeners
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.removeEventListener('click', buttonClickHandler);
            console.log(`Event removed from button: ${button.id}`);
        });
        // Add event listeners again
        addEventToGuidemButtons();
    }
    function waitForButtonsAndAddEvents(answer) {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (document.readyState === "complete") { // Wait for the page to fully load
            addEventToGuidemButtons(answer);
            clearInterval(intervalId); // Stop checking once the event listeners are added
        }
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking after max attempts
        }
    }, 1000); // Check every 1 second
}
    // Your triggers or events that require reloading the event handlers
    // Example trigger:
    const reloadButton = document.getElementById('reload-button');
    if (reloadButton) {
        reloadButton.addEventListener('click', function () {
            reloadGuidemButtonHandlers();
            console.log('Event handlers reloaded');
        });
    }

    // Initial load of event handlers
    addEventToGuidemButtons();

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            // Trigger a reload of event handlers when CoursePlayer content changes
            reloadGuidemButtonHandlers();
            console.log('CoursePlayer content changed');
        });
    }

    // Use window.onload for additional reliability in SPA
    window.onload = function() {
        reloadGuidemButtonHandlers();
        addEventToGuidemButtons();
        console.log("Window has fully loaded.");
    };
});

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

function waitForGuidemButtonsAndAddEvent() {
    const maxAttempts = 999999;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToGuidemButtons() || attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking once buttons are found or max attempts reached
        }
        attempts++;
    }, 1000); // Check every 1 second
}

function displayAlert(message, color) {
    // Customize and display your alert here
    alert(message);
}
setInterval(addEventToGuidemButtons, 1000); 
// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        // Wait for a brief moment before executing waitForGuidemButtonsAndAddEvent
        // to ensure that the DOM has updated.
        setTimeout(function() {
            waitForGuidemButtonsAndAddEvent();
        }, 1000); // Reduced the timeout to 100ms
    });
}

// Initialize the process for buttons with class 'guidem-button'
waitForGuidemButtonsAndAddEvent();

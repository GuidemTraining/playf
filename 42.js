function addEventToGuidemButtons() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const formId = this.id.replace("submit-button", "gflag-form");
            const form = document.getElementById(formId);
            if (form) {
                const input = form.querySelector('input[type="text"]');
                if (input) {
                    displayAlert(`Button clicked! You entered: ${input.value}`, 'green');
                }
            }
        });
    });
    console.log("Events added to buttons with class 'guidem-button'");
    return buttons.length > 0; // Return true if buttons were found and events were added
}

function waitForGuidemButtonsAndAddEvent() {
    const maxAttempts = 1110;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToGuidemButtons() || attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking once buttons are found or max attempts reached
        }
        attempts++;
    }, 1000); // Check every 1 second
}

// Start the process for buttons with class 'guidem-button'
waitForGuidemButtonsAndAddEvent();

function displayAlert(message, color) {
    // Customize and display your alert here
    alert(message);
}

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        // Wait for 1 second before executing waitForGuidemButtonsAndAddEvent
        setTimeout(function() {
            waitForGuidemButtonsAndAddEvent();
        }, 1000); 
    });
}

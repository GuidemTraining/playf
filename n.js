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
        // Add the event listener to each button
        button.addEventListener('click', buttonClickHandler);
    });
    console.log("Events added to buttons with class 'guidem-button'");
}

function displayAlert(message, color) {
    // Customize and display your alert here
    alert(message);
}

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        // Wait for a brief moment before executing addEventToGuidemButtons
        // to ensure that the DOM has updated.
        setTimeout(function() {
            addEventToGuidemButtons();
        }, 100); // Reduced the timeout to 100ms
    });
}

// Initialize the process for buttons with class 'guidem-button'
addEventToGuidemButtons();

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
        button.removeEventListener('click', buttonClickHandler);
        button.addEventListener('click', buttonClickHandler);
    });
    console.log("Events (re)added to buttons with class 'guidem-button'");
    return buttons.length > 0;
}

function waitForGuidemButtonsAndAddEvent() {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToGuidemButtons() || attempts >= maxAttempts) {
            clearInterval(intervalId);
        }
        attempts++;
    }, 1000);
}

function displayAlert(message, color) {
    alert(message);
}

// Thinkific CoursePlayerV2 hook logic
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForGuidemButtonsAndAddEvent();
    });
}

// Detect URL or hash changes to handle navigation within the SPA
window.addEventListener('hashchange', function() {
    waitForGuidemButtonsAndAddEvent();
});

// Initial call to setup listeners
waitForGuidemButtonsAndAddEvent();

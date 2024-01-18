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
}

function displayAlert(message, color) {
    alert(message);
}

// Listen for changes in the URL
window.onpopstate = function(event) {
    console.log("URL changed, reapplying event handlers.");
    addEventToGuidemButtons();
};

// Thinkific CoursePlayerV2 hook logic (optional in this case)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        addEventToGuidemButtons();
    });
}

// Initial call to setup listeners
addEventToGuidemButtons();

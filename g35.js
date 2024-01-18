function addClickEventToButton(button) {
    if (!button.clickEventAdded) {
        button.addEventListener('click', function () {
            handleButtonClick(button);
        });
        button.clickEventAdded = true; // Mark the button to avoid adding the event multiple times
        console.log("Click event added to button:", button.id);
    }
}

function handleButtonClick(button) {
    // Assuming the input is immediately before the button in the DOM
    const input = button.previousElementSibling; 
    if (input) {
        const message = 'Button clicked. Input value: ' + input.value;
        displayAlert(message, 'green');
    }
}

function continuouslyCheckAndAddEvents(buttonSelector) {
    setInterval(function () {
        const buttons = document.querySelectorAll(buttonSelector);
        buttons.forEach(addClickEventToButton);
    }, 1000); // Check and try to add events every 1 second
}

// This selector should be specific to the submit buttons you are targeting
continuouslyCheckAndAddEvents('input[type="submit"]');

function displayAlert(message, color) {
    // Customize and display your alert here
    // This example uses a simple browser alert, but you can customize this to integrate with your UI framework
    alert(message);
}

// If you're using Thinkific and need to reapply this when the content changes
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function () {
        continuouslyCheckAndAddEvents('input[type="submit"]');
    });
}

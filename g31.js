function addEventToButtons() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const buttonId = button.id;
            const inputId = buttonId.replace("submit-button", "gflag-input");
            const input = document.getElementById(inputId);
            if (input) {
                const userInput = input.value;
                // Debugging statement to log userInput
                console.log("User Input:", userInput);
                // You can add your logic here
            }
        });
        console.log("Event added to button:", button.id);
    });
}

function waitForButtonsAndAddEvents() {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (document.readyState === "complete") { // Wait for the page to fully load
            addEventToButtons();
            clearInterval(intervalId); // Stop checking once the event listeners are added
        }
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking after max attempts
        }
    }, 1000); // Check every 1 second
}

// Start the process for buttons with class 'guidem-button' and IDs starting with 'submit-button'
waitForButtonsAndAddEvents();

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonsAndAddEvents();
    });
}

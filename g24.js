let eventListenersAdded = false; // Variable to track if the event listeners have been added

function addEventToButtons(answer) {
    if (!eventListenersAdded) { // Check if the event listeners have been added
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const formId = button.id.replace("submit-button", "gflag-form");
                const inputId = button.id.replace("submit-button", "gflag-input");
                const form = document.getElementById(formId);
                const input = document.getElementById(inputId);
                if (input) {
                    const userInput = input.value;
                    const userInputHash = sha256(userInput);
                    if (userInputHash === answer) {
                        displayAlert('Correct Answer!', 'green');
                    } else {
                        displayAlert('Incorrect Answer! Please try again.', 'red');
                    }
                }
            });
            console.log("Event added to button:", button.id);
        });
        eventListenersAdded = true; // Set the flag to indicate that the event listeners have been added
    }
}

function waitForButtonsAndAddEvents(answer) {
    const maxAttempts = 1000;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (document.readyState === "complete") { // Wait for the page to fully load
            addEventToButtons(answer);
            clearInterval(intervalId); // Stop checking once the event listeners are added
        }
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking after max attempts
        }
    }, 1000); // Check every 1 second
}

// Start the process for buttons with class 'guidem-button' using the answer hash
waitForButtonsAndAddEvents('correctAnswer1Hash');

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonsAndAddEvents('correctAnswer1Hash');
    });
}

function sha256(input) {
    // Implement SHA-256 hashing here (you can use a library or write your own)
    // Return the hash value as a string
    return input; // Replace with the actual hashing logic
}

function displayAlert(message, color) {
    // Customize and display your alert here
    // You can use Bootstrap modals or other UI frameworks for a prettier alert
    alert(message);
}

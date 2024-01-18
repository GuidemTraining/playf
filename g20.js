let eventListenerAdded = false; // Variable to track if the event listener has been added

function addEventToButtons(answer) {
    if (!eventListenerAdded) { // Check if the event listener has been added
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const form = button.closest('form'); // Find the closest form element
                const input = form.querySelector('input[type="text"]'); // Find the input field within the form
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
        eventListenerAdded = true; // Set the flag to indicate that the event listener has been added
    }
}

function waitForButtonsAndAddEvents(answer) {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (eventListenerAdded || attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking once the event listener is added or max attempts reached
        }
        attempts++;
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

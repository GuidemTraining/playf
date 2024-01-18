let eventListenersAdded = false; // Variable to track if the event listeners have been added

function addEventToButtons(correctAnswerHash) {
    if (!eventListenersAdded) { // Check if the event listeners have been added
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const inputId = button.id.replace("submit-button", "gflag-input");
                const input = document.getElementById(inputId);
                if (input) {
                    const userInput = input.value;
                    const userInputHash = sha256(userInput);
                    if (userInputHash === correctAnswerHash) {
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

function waitForButtonsAndAddEvents(correctAnswerHash) {
    const intervalId = setInterval(function () {
        if (document.readyState === "complete") { // Wait for the page to fully load
            addEventToButtons(correctAnswerHash);
            clearInterval(intervalId); // Stop checking once the event listeners are added
        }
    }, 1000); // Check every 1 second
}

// Example of how to start the process with the correct answer hash
let correctAnswerHash = 'yourCorrectAnswerHashHere'; // Replace with your actual correct answer hash
waitForButtonsAndAddEvents(correctAnswerHash);

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        eventListenersAdded = false; // Reset to allow re-adding of event listeners
        waitForButtonsAndAddEvents(correctAnswerHash);
    });
}

function sha256(input) {
    // Implement SHA-256 hashing here (you can use a library or write your own)
    // Return the hash value as a string
    // Placeholder for the hashing function - replace with actual implementation
    return input; 
}

function displayAlert(message, color) {
    // Customize and display your alert here
    alert(message);
}


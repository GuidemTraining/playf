let eventListenersAdded = false; // Variable to track if the event listeners have been added
let buttonSubmissionCount = 0; // Variable to count button submissions

function addEventToButtons(answer) {
    if (!eventListenersAdded) { // Check if the event listeners have been added
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                if (buttonSubmissionCount < 10) { // Check the submission count
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
                        buttonSubmissionCount++; // Increment submission count
                    } else {
                        displayAlert('Input not found!', 'red');
                    }
                } else {
                    displayAlert('Maximum submission limit reached!', 'red');
                }
            });
            console.log("Event added to button:", button.id);
        });
        eventListenersAdded = true; // Set the flag to indicate that the event listeners have been added
    }
}

// Function to check for events every 1 second
function checkForEvents(answer) {
    setInterval(function () {
        if (document.readyState === "complete") { // Wait for the page to fully load
            addEventToButtons(answer);
        }
    }, 1000); // Check every 1 second
}

// Start checking for events
checkForEvents('correctAnswer1Hash');

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        checkForEvents('correctAnswer1Hash');
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

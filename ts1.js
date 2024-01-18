let clickOccurred = false;

// Function to add event to the button
function addEventToButton(buttonId, answer) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            clickOccurred = true;
            const inputId = buttonId.replace("submit-button", "gflag-input");
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
        console.log("Event added to button:", buttonId);
        return true; // Indicate that the button was found and event was added
    }
    return false; // Button not found
}

// Function to hook into CoursePlayerV2 events
function hookIntoCoursePlayerV2() {
    if (typeof CoursePlayerV2 !== 'undefined' && clickOccurred) {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            waitForButtonAndAddEvent('submit-button1', 'correctAnswer1Hash');
        });
    }
}

// Wait for a click event to occur
document.addEventListener('click', function () {
    if (!clickOccurred) {
        clickOccurred = true;
        hookIntoCoursePlayerV2();
    }
});

// Start the process for 'submit-button1' with the answer hash
waitForButtonAndAddEvent('submit-button1', 'correctAnswer1Hash');

// Function to hash user input (implement your own SHA-256 hashing)
function sha256(input) {
    // Implement SHA-256 hashing here (you can use a library or write your own)
    // Return the hash value as a string
}

// Function to display an alert
function displayAlert(message, color) {
    // Customize and display your alert here
    // You can use Bootstrap modals or other UI frameworks for a prettier alert
    alert(message);
}

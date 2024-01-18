function addEventToButton(buttonId, answer) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            const inputId = buttonId.replace("submit-button", "gflag-input");
            const input = document.getElementById(inputId);
            if (input) {
                const userInput = input.value;
                const userInputHash = sha256(userInput);
                if (userInputHash === answer) {
                    displayCustomAlert('Correct Answer!', 'green');
                } else {
                    displayCustomAlert('Incorrect Answer! Please try again.', 'red');
                }
            }
        });
        console.log("Event added to button:", buttonId);
        return true; // Indicate that the button was found and event was added
    }
    return false; // Button not found
}

function waitForButtonAndAddEvent(buttonId, answer) {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToButton(buttonId, answer) || attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking once the button is found or max attempts reached
        }
        attempts++;
    }, 1000); // Check every 1 second
}

// Start the process for 'submit-button1' with the answer hash
waitForButtonAndAddEvent('submit-button1', 'correctAnswer1Hash');

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonAndAddEvent('submit-button1', 'correctAnswer1Hash');
    });
}

function sha256(input) {
    // Implement SHA-256 hashing here (you can use a library or write your own)
    // Return the hash value as a string
}

function displayCustomAlert(message, color) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.textContent = message;
    alertBox.style.backgroundColor = color;

    document.body.appendChild(alertBox);

    setTimeout(function () {
        document.body.removeChild(alertBox);
    }, 3000); // Remove the alert after 3 seconds
}

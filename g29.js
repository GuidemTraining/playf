function addEventToButton(button, answer) {
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
}

function waitForButtonsAndAddEvents() {
    const buttonsWithAnswers = [
        { buttonId: 'submit-button1', answer: 'correctAnswer1Hash' },
        { buttonId: 'submit-button2', answer: 'correctAnswer2Hash' },
        // Add more buttons and answers as needed
    ];

    buttonsWithAnswers.forEach(function (buttonInfo) {
        const button = document.getElementById(buttonInfo.buttonId);
        if (button) {
            addEventToButton(button, buttonInfo.answer);
        }
    });
}

function sha256(input) {
    // Implement SHA-256 hashing here (you can use a library or write your own)
    // Return the hash value as a string
}

function displayAlert(message, color) {
    // Customize and display your alert here
    // You can use Bootstrap modals or other UI frameworks for a prettier alert
    alert(message);
}

// Start the process for all buttons with class 'guidem-button'
waitForButtonsAndAddEvents();

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonsAndAddEvents();
    });
}

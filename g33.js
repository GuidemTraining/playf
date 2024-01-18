// Function to add event listener to a button
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

// Function to add event listeners to all buttons with class 'guidem-button'
function addEventToButtons(answer) {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(function (button) {
        const buttonId = button.id;
        addEventToButton(buttonId, answer);
    });
}

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        addEventToButtons('correctAnswer1Hash');
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

function addEventToButtons(answer) {
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
}

// Start the process for buttons with class 'guidem-button' using the answer hash
addEventToButtons('correctAnswer1Hash');

function sha256(input) {
    // Implement SHA-256 hashing here (you can use a library or write your own)
    // Return the hash value as a string
    // For testing purposes, you can use a simple function like this:
    return input; // Replace this with actual SHA-256 hashing
}

function displayAlert(message, color) {
    // Customize and display your alert here
    // You can use Bootstrap modals or other UI frameworks for a prettier alert
    alert(message);
}

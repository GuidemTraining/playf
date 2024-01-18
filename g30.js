function addEventToButtons() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const form = button.closest('form'); // Find the nearest form element
            if (form) {
                const input = form.querySelector('input[type="text"]'); // Find the input element within the form
                if (input) {
                    const userInput = input.value;
                    // You can perform any validation or checks here before submission
                    // For example, you can hash the userInput and compare it to the expected answer
                    // If the validation is successful, display the "Correct Answer!" message, otherwise "Incorrect Answer!"
                    // Example:
                    // const userInputHash = sha256(userInput);
                    // if (userInputHash === answer) {
                    //     displayAlert('Correct Answer!', 'green');
                    // } else {
                    //     displayAlert('Incorrect Answer! Please try again.', 'red');
                    // }
                }
            }
        });
    });
}

// Check for new buttons and add event listeners every one second for 'addbuttonevents'
setInterval(function () {
    addEventToButtons();
}, 1000);

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        addEventToButtons();
    });
}

function displayAlert(message, color) {
    // Customize and display your alert here
    // You can use Bootstrap modals or other UI frameworks for a prettier alert
    alert(message);
}

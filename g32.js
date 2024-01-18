function addEventToButtons() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const buttonId = button.id;
            const inputId = buttonId.replace("submit-button", "gflag-input");
            const input = document.getElementById(inputId);
            if (input) {
                const userInput = input.value;
                // Debugging statement to log userInput
                console.log("User Input:", userInput);
                // You can add your logic here
            }
        });
        console.log("Event added to button:", button.id);
    });
}

// Start the process for buttons with class 'guidem-button' and IDs starting with 'submit-button'
addEventToButtons();

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        addEventToButtons();
    });
}

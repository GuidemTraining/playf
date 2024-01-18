function addEventToButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            // Add input sanitation and comparison here
            const answer = prompt("Please enter your answer:");
            const hashedAnswer = sha256(answer);
            const correctAnswer = "hashedCorrectAnswer"; // Replace with the actual hashed correct answer
            const isCorrect = (hashedAnswer === correctAnswer);
            
            if (isCorrect) {
                alert('Correct Answer!'); // Display a success message
            } else {
                alert('Incorrect Answer! Please try again.'); // Display an error message
            }
        });
        console.log("Event added to button:", buttonId);
        return true; // Indicate that the button was found and event was added
    }
    return false; // Button not found
}

function waitForButtonAndAddEvent(buttonId) {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToButton(buttonId) || attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking once the button is found or max attempts reached
        }
        attempts++;
    }, 1000); // Check every 1 second
}

// Start the process for 'submit-button1'
waitForButtonAndAddEvent('submit-button1');

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonAndAddEvent('submit-button1');
    });
}

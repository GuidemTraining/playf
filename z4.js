// Initialize Toastr
toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
};

document.addEventListener('DOMContentLoaded', function() {
    let incorrectCount = 0; // Initialize incorrect answer count
    let lastIncorrectTime = 0; // Initialize timestamp for the last incorrect answer

    // Event delegation for handling button clicks
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('guidem-button')) {
            const form = event.target.closest('.guidem-form');
            if (form) {
                const inputValue = form.querySelector('input[type="text"]').value;
                const questionId = form.getAttribute('data-question-id');

                console.log("Button clicked. Input Value: ", inputValue);
                console.log("Question ID: ", questionId);

                // Check if the answer is incorrect
                const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3']; // Replace with your correct answers
                if (!correctAnswers.includes(inputValue)) {
                    incorrectCount++; // Increment incorrect answer count
                    const currentTime = new Date().getTime();

                    // Check if conditions are met to disable submit button
                    if (incorrectCount >= 5 && (currentTime - lastIncorrectTime) <= 10000) {
                        disableSubmitButton(); // Disable submit button for 10 seconds
                    } else if (incorrectCount >= 10 && (currentTime - lastIncorrectTime) <= 60000) {
                        disableSubmitButton(); // Disable submit button for 5 minutes
                        setTimeout(enableSubmitButton, 300000); // Enable submit button after 5 minutes
                    }

                    lastIncorrectTime = currentTime; // Update last incorrect time

                    // Show incorrect notification
                    showNotification('Incorrect', 'error');
                } else {
                    // If the answer is correct, change the button to "Completed" and make it green
                    event.target.textContent = 'Completed';
                    event.target.style.backgroundColor = 'green';
                    event.target.disabled = true; // Disable the button

                    // Show correct notification
                    showNotification('Correct', 'success');
                }

                // Simulate sending data to server.js (printing in console)
                sendDataToServer(questionId, inputValue);
            }
        }
    });

    // Function to show notifications using Toastr
    function showNotification(message, type) {
        toastr[type](message);
    }

    // Function to send data to the server (Replace with your logic)
    function sendDataToServer(questionId, answer) {
        // Replace this with your logic to send data to the server
        console.log("Sending data to server:");
        console.log("Question ID: ", questionId);
        console.log("Answer: ", answer);
    }

    // Function to disable the submit button
    function disableSubmitButton() {
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    // Function to enable the submit button
    function enableSubmitButton() {
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
});

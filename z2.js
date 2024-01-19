$(document).ready(function () {
    let incorrectCount = 0; // Initialize incorrect answer count
    let lastIncorrectTime = 0; // Initialize timestamp for the last incorrect answer

    // Event delegation for handling button clicks
    $(document).on('click', '.guidem-button', function() {
        const form = $(this).closest('.guidem-form');
        if (form.length) {
            const inputValue = form.find('input[type="text"]').val();
            const questionId = form.data('question-id'); // Get the data-question-id attribute

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
            }

            // Simulate sending data to server.js (printing in console)
            sendDataToServer(questionId, inputValue);
        }
    });

    // Function to handle the answer
    function sendDataToServer(questionId, answer) {
        // Simulate sending data to server.js (printing in console)
        console.log("Sending data to server.js:");
        console.log("Question ID: ", questionId);
        console.log("User ID: ", getUserId()); // Replace with your logic to get user ID
        console.log("Lesson ID: ", getLessonId()); // Replace with your logic to get lesson ID
        console.log("Answer: ", answer);

        // Check for missing data and print error if any data is missing
        if (!questionId || !getUserId() || !getLessonId() || !answer) {
            console.error("Error: Missing data.");
        }
    }

    // Function to disable the submit button
    function disableSubmitButton() {
        $('.guidem-button').prop('disabled', true);
    }

    // Function to enable the submit button
    function enableSubmitButton() {
        $('.guidem-button').prop('disabled', false);
    }

    // Function to get user ID (replace with your logic)
    function getUserId() {
        // Replace with your logic to get user ID
        return '123456';
    }

    // Function to get lesson ID (replace with your logic)
    function getLessonId() {
        // Replace with your logic to get lesson ID
        return 'lesson123';
    }

    // Observer for any DOM changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Add any specific logic here if needed when new nodes are added
            }
        });
    });

    // Configuration for the observer
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    // Additional logic for CoursePlayerV2, if needed
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            // Handle CoursePlayerV2 content change
        });
    }
});

$(document).ready(function () {
    // Event delegation for handling button clicks
    $(document).on('click', '.guidem-button', function() {
        const form = $(this).closest('.guidem-form');
        if (form.length) {
            const inputValue = form.find('input[type="text"]').val();
            console.log("Button clicked. Input Value: ", inputValue);

            // Add your logic here to handle the input value
            handleAnswer(inputValue);
        }
    });

    // Function to handle the answer
    function handleAnswer(answer) {
        const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3']; // Replace with your correct answers
        const notification = $('.custom-notification');

        if (correctAnswers.includes(answer)) {
            // Correct answer
            showNotification(notification, 'Correct', 'green');
        } else {
            // Incorrect answer
            showNotification(notification, 'Incorrect', 'red');
        }
    }

    // Function to show notifications
    function showNotification(element, message, color) {
        element.text(message);
        element.css('background-color', color);
        element.fadeIn().delay(2000).fadeOut();
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

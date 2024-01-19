$(document).ready(function () {
    const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3', 'GOODMODE4', 'GOODMODE5', 'GOODMODE6', 'GOODMODE7', 'GOODMODE8', 'GOODMODE9', 'GOODMODE10'];
    let completedCount = 0; // To keep track of the number of correct answers
    let isFirstAccordionCompleted = false; // To track if the first accordion is completed

    // Function to update the progress bar
    function updateProgressBar(completed, total) {
        const progressBar = document.getElementById('progress-bar');
        const percentage = (completed / total) * 100;
        progressBar.style.width = percentage + '%';
        // Update progress text if you have an element for it
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `Your Progress: ${completed}/${total}`;
        }
    }

    function showBootstrapNotification(message, color) {
        const alertContainer = document.getElementById('alert-container');
        const alert = document.createElement('div');
        alert.className = `alert alert-${color} alert-dismissible fade show mt-3`;
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alert);

        setTimeout(function () {
            alert.remove();
        }, 3000);
    }

    $('.guidem-button').on('click', function (event) {
        const button = $(this);
        const form = button.closest('.guidem-form');
        if (form) {
            const input = form.find('input[type="text"]');
            if (input) {
                const inputValue = input.val();
                if (correctAnswers.includes(inputValue)) {
                    input.prop('disabled', true);
                    button.prop('disabled', true); // Disable the button
                    button.css({ 'color': '#888', 'background-color': '#00cc00' }).text('Completed');
                    showBootstrapNotification('Congrats! Your answer is correct', 'success');

                    // Increment the completed count and update the progress bar
                    completedCount++;
                    updateProgressBar(completedCount, correctAnswers.length);

                    // Check if all buttons in the first accordion are completed
                    if (completedCount === 10) {
                        isFirstAccordionCompleted = true;
                    }
                } else {
                    // Handle incorrect answer as before
                    button.css('background-color', 'red');
                    setTimeout(function () {
                        button.css('background-color', '#0056b3');
                    }, 2000);
                    showBootstrapNotification('Try again! Your answer is incorrect', 'danger');
                }
            }
        }
    });

    // Function to prevent expanding the second accordion until the first accordion is completed
    function preventAccordionExpand() {
        if (!isFirstAccordionCompleted) {
            $('.accordion-button').on('click', function (event) {
                event.preventDefault();
            });
        }
    }

    preventAccordionExpand(); // Call the function to prevent accordion expand initially
});

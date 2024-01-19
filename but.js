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
        const notification = document.getElementById('bootstrap-notification');
        const notificationText = document.getElementById('bootstrap-notification-text');
        notificationText.textContent = message;
        notification.classList.add(`bg-${color}`);
        notification.classList.add('show');
        setTimeout(function () {
            notification.classList.remove(`bg-${color}`);
            notification.classList.remove('show');
        }, 3000);
    }

    function buttonClickHandler(event) {
        const button = event.currentTarget;
        const formId = button.id.replace("submit-button", "gflag-form");
        const form = document.getElementById(formId);
        if (form) {
            const input = form.querySelector('input[type="text"]');
            if (input) {
                const inputValue = input.value;
                if (correctAnswers.includes(inputValue)) {
                    input.disabled = true;
                    button.disabled = true; // Disable the button
                    button.classList.add('btn-secondary');
                    button.textContent = 'Completed';
                    showBootstrapNotification('Congrats! Your answer is correct.', 'success');

                    // Increment the completed count and update the progress bar
                    completedCount++;
                    updateProgressBar(completedCount, correctAnswers.length);

                    // Check if all buttons in the first accordion are completed
                    if (completedCount === 10) {
                        isFirstAccordionCompleted = true;
                    }
                } else {
                    // Handle incorrect answer
                    showBootstrapNotification('Try again! Your answer is incorrect.', 'danger');
                    button.classList.add('btn-danger');
                    setTimeout(function () {
                        button.classList.remove('btn-danger');
                    }, 2000);
                }
            }
        }
    }

    function addEventToGuidemButtons() {
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.removeEventListener('click', buttonClickHandler);
            button.addEventListener('click', buttonClickHandler);
        });
    }

    function reloadGuidemButtonHandlers() {
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.removeEventListener('click', buttonClickHandler);
        });
        addEventToGuidemButtons();
    }

    function waitForButtonsAndAddEvents() {
        const maxAttempts = 10;
        let attempts = 0;

        const intervalId = setInterval(function () {
            if (document.readyState === "complete") {
                if (addEventToGuidemButtons()) {
                    clearInterval(intervalId); // Stop checking once the event listeners are added
                }
            }
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalId); // Stop checking after max attempts
            }
        }, 1000); // Check every 1 second
    }

    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(reloadGuidemButtonHandlers, 1000); // Delay to ensure that the DOM has updated
        });
    }

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                reloadGuidemButtonHandlers();
            }
        });
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    waitForButtonsAndAddEvents();

    const reloadButton = document.getElementById('reload-button');
    if (reloadButton) {
        reloadButton.addEventListener('click', function () {
            reloadGuidemButtonHandlers();
        });
    }

    // Function to prevent expanding the second accordion until the first accordion is completed
    function preventAccordionExpand() {
        if (!isFirstAccordionCompleted) {
            const accordionButtons = document.querySelectorAll('.accordion-button');
            accordionButtons.forEach(button => {
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                });
            });
        }
    }

    preventAccordionExpand(); // Call the function to prevent accordion expand initially
});

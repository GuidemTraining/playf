$(document).ready(function () {
    const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3', 'GOODMODE4', 'GOODMODE5', 'GOODMODE6', 'GOODMODE7', 'GOODMODE8', 'GOODMODE9', 'GOODMODE10'];

    function showCustomNotification(message, duration, color) {
        const notification = document.getElementById('custom-notification');
        notification.innerHTML = message;
        notification.style.display = 'block';
        notification.style.backgroundColor = color;
        notification.style.animation = 'fadeInOut 5s forwards';

        setTimeout(function () {
            notification.style.animation = '';
            notification.style.display = 'none';
        }, duration);
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
                    input.style.color = '#888';
                    button.textContent = 'Completed';
                    button.style.backgroundColor = '#00cc00';
                    showCustomNotification('<img src="checkmark.png" alt="Correct">', 3000, '#00cc00');
                } else {
                    showCustomNotification('<img src="xmark.png" alt="Incorrect">', 3000, 'red');
                    button.style.backgroundColor = 'red';
                    setTimeout(function () {
                        button.style.backgroundColor = '#0056b3';
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
            console.log(`Event added to button: ${button.id}`);
        });
        console.log("Events (re)added to buttons with class 'guidem-button'");
        return buttons.length > 0;
    }

    function reloadGuidemButtonHandlers() {
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.removeEventListener('click', buttonClickHandler);
            console.log(`Event removed from button: ${button.id}`);
        });
        addEventToGuidemButtons();
    }

    // Function to wait for buttons to be available and add event handlers
    function waitForButtonsAndAddEvents() {
        const maxAttempts = 10;
        let attempts = 0;

        const intervalId = setInterval(function () {
            if (document.readyState === "complete") {
                if (addEventToGuidemButtons()) {
                    console.log("Event listeners added after page load.");
                    clearInterval(intervalId); // Stop checking once the event listeners are added
                }
            }
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalId); // Stop checking after max attempts
                console.log("Max attempts reached. Event listeners may not have been added.");
            }
        }, 1000); // Check every 1 second
    }

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(reloadGuidemButtonHandlers, 1000); // Delay to ensure that the DOM has updated
            console.log('CoursePlayer content changed');
        });
    }

    // Use MutationObserver as a fallback for dynamic content that may be added after initial page load
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                reloadGuidemButtonHandlers();
            }
        });
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    // Initial load of event handlers
    waitForButtonsAndAddEvents();

    // Your triggers or events that require reloading the event handlers
    const reloadButton = document.getElementById('reload-button');
    if (reloadButton) {
        reloadButton.addEventListener('click', function () {
            reloadGuidemButtonHandlers();
            console.log('Event handlers reloaded');
        });
    }
});

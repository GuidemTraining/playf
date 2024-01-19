$(document).ready(function () {
    $('.guidem-button').click(function () {
        // Find the closest form to the clicked button
        const form = $(this).closest('.guidem-form');
        if (form.length) {
            // Get the value from the input field in the same form
            const inputValue = form.find('input[type="text"]').val();
            console.log("Button clicked. Input Value: ", inputValue);

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

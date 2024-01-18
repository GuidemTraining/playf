$(document).ready(function () {
    const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3', 'GOODMODE4', 'GOODMODE5', 'GOODMODE6', 'GOODMODE7', 'GOODMODE8', 'GOODMODE9', 'GOODMODE10'];
    let completedCount = 0; // To keep track of the number of correct answers

    // Retrieve the current user's session data from local storage
    const storedUserData = localStorage.getItem('userData');
    let userId = null;
    let userEmail = null;
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        userId = userData.userId;
        userEmail = userData.userEmail;
    }

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
                    button.disabled = true; // Disable the button
                    button.style.color = '#888';
                    button.textContent = 'Completed';
                    button.style.backgroundColor = '#00cc00';
                    showCustomNotification('<img src="checkmark.png" alt="Correct">', 3000, '#00cc00');

                    // Increment the completed count and update the progress bar
                    completedCount++;
                    updateProgressBar(completedCount, correctAnswers.length);
                    const serverUrl = 'https://sb1.guidem.ph/api/submitData';
                    const requestData = { userId: userId, userEmail: userEmail, answer: inputValue }; // Include userId and userEmail
                    fetch(serverUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // Parse the response JSON if needed
                    })
                    .then(data => {
                        // Handle the server's response data as needed
                        console.log('Server response:', data);
                    })
                    .catch(error => {
                        // Handle any errors that occurred during the fetch
                        console.error('Fetch error:', error);
                    });
                } else {
                    // Handle incorrect answer as before
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

    // Update the progress bar on initial load
    updateProgressBar(completedCount, correctAnswers.length);
});

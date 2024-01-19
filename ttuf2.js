$(document).ready(function () {
    const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3', 'GOODMODE4', 'GOODMODE5', 'GOODMODE6', 'GOODMODE7', 'GOODMODE8', 'GOODMODE9', 'GOODMODE10'];
    let completedCount = 0;

    // Retrieve session data
    const storedUserData = localStorage.getItem('userData');
    let userId = null, userEmail = null;
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        userId = userData.userId;
        userEmail = userData.userEmail;
    }

    // Update the progress bar
    function updateProgressBar(completed, total) {
        const progressBar = document.getElementById('progress-bar');
        const percentage = (completed / total) * 100;
        progressBar.style.width = percentage + '%';
    }

    // Show custom notifications
    function showCustomNotification(message, duration, color) {
        const notification = document.getElementById('custom-notification');
        notification.innerHTML = message;
        notification.style.display = 'block';
        notification.style.backgroundColor = color;

        setTimeout(() => {
            notification.style.display = 'none';
        }, duration);
    }

    // Handle button clicks
    function buttonClickHandler(event) {
        const button = event.currentTarget;
        const input = button.previousElementSibling;
        const inputValue = input.value;

        if (correctAnswers.includes(inputValue)) {
            input.disabled = true;
            button.disabled = true;
            button.style.backgroundColor = '#00cc00';
            showCustomNotification('<img src="checkmark.png" alt="Correct">', 3000, '#00cc00');

            completedCount++;
            updateProgressBar(completedCount, correctAnswers.length);

            // Send data to server
            const requestData = { userId, userEmail, answer: inputValue };
            fetch('https://sb1.guidem.ph/api/submitData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            })
            .then(response => response.ok ? response.json() : Promise.reject('Error'))
            .then(data => console.log('Server response:', data))
            .catch(error => console.error('Fetch error:', error));
        } else {
            showCustomNotification('<img src="xmark.png" alt="Incorrect">', 3000, 'red');
        }
    }

    // Add event listeners to buttons
    function addEventListenersToButtons() {
        document.querySelectorAll('.guidem-button').forEach(button => {
            button.addEventListener('click', buttonClickHandler);
        });
    }

    addEventListenersToButtons();
});

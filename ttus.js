document.addEventListener('DOMContentLoaded', function () {
    const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3', 'GOODMODE4', 'GOODMODE5', 'GOODMODE6', 'GOODMODE7', 'GOODMODE8', 'GOODMODE9', 'GOODMODE10'];
    let completedCount = 0;

    function showCustomNotification(message, isSuccess) {
        const notification = document.createElement('div');
        notification.className = isSuccess ? 'congrats-notification' : 'try-again-notification';
        notification.innerHTML = message;
        document.body.appendChild(notification);

        setTimeout(function () {
            document.body.removeChild(notification);
        }, 3000);
    }

    function handleButtonClick(event) {
        const button = event.currentTarget;
        const input = button.previousElementSibling; // Assuming the input is right before the button
        if (!input) return;

        const answer = input.value.trim();
        if (correctAnswers.includes(answer.toUpperCase())) {
            showCustomNotification('Correct!', true);
            button.disabled = true;
            input.disabled = true;
            completedCount++;

            // Optional: send data to server
            // sendAnswerToServer(answer);
        } else {
            showCustomNotification('Incorrect, try again!', false);
        }
    }

    function addEventListenersToButtons() {
        const buttons = document.querySelectorAll('.guidem-button');
        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });
    }

    addEventListenersToButtons();
});

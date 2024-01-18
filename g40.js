function addEventToButton(button, correctAnswerHash) {
    if (!button.eventAdded) {
        button.addEventListener('click', function () {
            handleButtonClick(button, correctAnswerHash);
        });
        button.eventAdded = true;
        console.log("Event added to button:", button.id);
    }
}

function handleButtonClick(button, correctAnswerHash) {
    const inputId = button.id.replace("submit-button", "gflag-input");
    const input = document.getElementById(inputId);
    if (input) {
        const userInput = input.value;
        const userInputHash = sha256(userInput);
        if (userInputHash === correctAnswerHash) {
            displayAlert('Correct Answer for ' + button.id + '!', 'green');
        } else {
            displayAlert('Incorrect Answer for ' + button.id + '! Please try again.', 'red');
        }
    }
}

function addEventListenersToAllButtons(correctAnswerHash) {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(function(button) {
        addEventToButton(button, correctAnswerHash);
    });
}

// MutationObserver to handle dynamically added buttons
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE && node.matches('.guidem-button')) {
                addEventToButton(node, correctAnswerHash);
            }
        });
    });
});

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });

// Check for buttons when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    addEventListenersToAllButtons(correctAnswerHash);
});

// Thinkific CoursePlayerV2 hook logic
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function () {
        addEventListenersToAllButtons(correctAnswerHash);
    });
}

function sha256(input) {
    // Implement SHA-256 hashing here
    return input; // Replace with actual hashing logic
}

function displayAlert(message, color) {
    alert(message);
}

let correctAnswerHash = 'yourCorrectAnswerHashHere'; // Replace with your actual correct answer hash

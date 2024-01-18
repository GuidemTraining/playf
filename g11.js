// Function to generate SHA-256 hash
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);            
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function checkAnswer(inputValue, correctHash) {
    const inputHash = await sha256(inputValue);
    return inputHash === correctHash;
}

function displayAlert(message, isSuccess) {
    const alertBox = document.createElement('div');
    alertBox.style.padding = '10px';
    alertBox.style.marginTop = '10px';
    alertBox.style.color = isSuccess ? '#155724' : '#721c24';
    alertBox.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
    alertBox.style.border = '1px solid';
    alertBox.style.borderColor = isSuccess ? '#c3e6cb' : '#f5c6cb';
    alertBox.style.borderRadius = '4px';
    alertBox.style.textAlign = 'left';
    alertBox.innerText = message;
    
    // Close button for alert
    const closeButton = document.createElement('span');
    closeButton.innerText = '×';
    closeButton.style.float = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = '15px';
    closeButton.onclick = function() {
        alertBox.remove();
    };
    
    alertBox.appendChild(closeButton);
    
    document.body.appendChild(alertBox);
}

function addEventToButton(buttonId) {
    const button = document.getElementById(buttonId);
    const input = document.querySelector(`#${buttonId.replace('submit-button', 'flag-input')}`);
    const correctHash = '9a36...'; // The correct SHA-256 hash value for the answer

    if (button && input) {
        button.addEventListener('click', async function () {
            const isCorrect = await checkAnswer(input.value, correctHash);
            if (isCorrect) {
                displayAlert('Correct answer!', true);
            } else {
                displayAlert('Uh-oh! Your answer is incorrect.', false);
            }
        });
        console.log("Event added to button:", buttonId);
        return true;
    }
    return false;
}

function waitForButtonAndAddEvent(buttonId) {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToButton(buttonId) || attempts >= maxAttempts) {
            clearInterval(intervalId);
        }
        attempts++;
    }, 1000);
}

waitForButtonAndAddEvent('submit-button1');

if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonAndAddEvent('submit-button1');
    });
}

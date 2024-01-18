// Function to create and update the notification badge
function createNotificationBadge(count) {
    // Create a new badge element
    const badge = document.createElement('div');
    badge.classList.add('notification-badge');
    badge.textContent = count;

    // Append the badge to the document body
    document.body.appendChild(badge);

    // Function to update the badge content
    function updateBadge(newCount) {
        badge.textContent = newCount;
    }

    return updateBadge;
}

// Example usage:
const updateBadge = createNotificationBadge(0); // Initialize with count 0

// Function to add event to submit button and handle input validation
function addEventToButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            // Get the input value
            const inputId = buttonId.replace('submit-button', 'gflag-input');
            const input = document.getElementById(inputId);
            if (input) {
                const answer = input.value.trim(); // Trim whitespace
                const answerSHA256 = sha256(answer); // Calculate SHA256 hash

                // Replace with the actual SHA256 answers
                const correctAnswersSHA256 = {
                    "1": "SHA256_hash_of_correctAnswer1",
                    "2": "SHA256_hash_of_correctAnswer2",
                    // ...
                    "10": "SHA256_hash_of_correctAnswer10"
                };

                const formNumber = buttonId.replace('submit-button', '');
                const isCorrect = answerSHA256 === correctAnswersSHA256[formNumber];

                if (isCorrect) {
                    displayAlert('Correct Answer!', 'green', formNumber);
                    input.disabled = true;
                    input.type = 'password';
                    input.value = '********';
                    input.style.backgroundColor = '#ccc';
                    input.classList.add('completed-input');
                    button.style.backgroundColor = '#28a745';
                    button.textContent = 'Completed';
                    button.disabled = true;
                    localStorage.setItem(`isCorrect${formNumber}`, 'true');
                    localStorage.setItem(`isCompleted${formNumber}`, 'true');

                    // Update the badge count
                    const currentCount = parseInt(updateBadge());
                    updateBadge(currentCount + 1);
                } else {
                    displayAlert('Incorrect Answer! Please try again.', 'red', formNumber);
                }
            }
        });
        console.log("Event added to button:", buttonId);
        return true; // Indicate that the button was found and event was added
    }
    return false; // Button not found
}

// Function to wait for button and add event
function waitForButtonAndAddEvent(buttonId) {
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(function () {
        if (addEventToButton(buttonId) || attempts >= maxAttempts) {
            clearInterval(intervalId); // Stop checking once the button is found or max attempts reached
        }
        attempts++;
    }, 1000); // Check every 1 second
}

// Start the process for 'submit-button1'
waitForButtonAndAddEvent('submit-button1');

// Thinkific CoursePlayerV2 hook logic (if applicable)
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        waitForButtonAndAddEvent('submit-button1');
    });
}

// Function to sanitize HTML input
function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Function to display an alert message
function displayAlert(message, color, formNumber) {
    var alertDiv = document.querySelector(`#gflag-form${formNumber} .kapow-alert`);
    alertDiv.textContent = message;
    alertDiv.style.color = color;
    setTimeout(function () {
        alertDiv.textContent = '';
    }, 5000);
}

// SHA256 hash function
async function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

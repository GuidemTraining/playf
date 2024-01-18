document.addEventListener('DOMContentLoaded', function () {
    var correctAnswers = {
        "1": "correctAnswer1", // Replace with the actual answers
        "2": "correctAnswer2",
        // ...
        "10": "correctAnswer10"
    };

    const addSubmitButtonsToForms = function () {
        for (let i = 1; i <= 10; i++) {
            const formId = `gflag-form${i}`;
            const inputId = `gflag-input${i}`;
            const isCompletedKey = `isCompleted${i}`;
            const isCorrectKey = `isCorrect${i}`;
            const isCompleted = localStorage.getItem(isCompletedKey);
            const isCorrect = localStorage.getItem(isCorrectKey);
            const form = document.getElementById(formId);
            const input = document.getElementById(inputId);

            if (isCompleted || isCorrect) {
                input.disabled = true;
                input.style.backgroundColor = '#ccc';
                input.classList.add('completed-input');
                if (input.type === "text") {
                    input.type = 'password';
                    input.value = '********';
                }
            }

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'guidem-button';
            button.textContent = isCompleted || isCorrect ? 'Completed' : 'Submit';
            button.style = {
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: isCompleted || isCorrect ? '#28a745' : '#0056b3', // Green for completed
                color: 'white',
                fontSize: '16px',
                cursor: isCompleted || isCorrect ? 'default' : 'pointer',
                transition: 'background-color 0.2s'
            };
            button.disabled = isCompleted || isCorrect;

            button.addEventListener('click', function () {
                var answer = sanitizeHTML(input.value);
                if (answer === correctAnswers[i]) {
                    displayAlert('Correct Answer!', 'green', i);
                    input.disabled = true;
                    input.type = 'password';
                    input.value = '********';
                    input.style.backgroundColor = '#ccc';
                    input.classList.add('completed-input');
                    button.style.backgroundColor = '#28a745';
                    button.textContent = 'Completed';
                    button.disabled = true;
                    localStorage.setItem(isCorrectKey, 'true');
                    localStorage.setItem(isCompletedKey, 'true');
                } else {
                    displayAlert('Incorrect Answer! Please try again.', 'red', i);
                }
            });

            var alertDiv = document.createElement('div');
            alertDiv.className = 'kapow-alert';
            form.appendChild(button);
            form.appendChild(alertDiv);
        }
    };

    function sanitizeHTML(str) {
        var temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function displayAlert(message, color, formNumber) {
        var alertDiv = document.querySelector(`#gflag-form${formNumber} .kapow-alert`);
        alertDiv.textContent = message;
        alertDiv.style.color = color;
        setTimeout(function () {
            alertDiv.textContent = '';
        }, 5000);
    }

    // Initialize forms based on the local storage
    addSubmitButtonsToForms();
        // Thinkific CoursePlayerV2 hook logic
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(addSubmitButtonsToForms, 1000);
        });
    }
    
});

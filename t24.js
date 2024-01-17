$(document).ready(function () {
    var correctAnswers = {
        "1": "correctAnswer1", // Replace with the actual answers
        "2": "correctAnswer2",
        // ...
        "10": "correctAnswer10"
    };

    const add_submit_btns_to_forms = function () {
        for (let i = 1; i <= 10; i++) {
            const formId = `flag-form${i}`;
            const inputId = `flag-input${i}`;
            const isCompletedKey = `isCompleted${i}`;
            const isCorrectKey = `isCorrect${i}`;
            const isCompleted = localStorage.getItem(isCompletedKey);
            const isCorrect = localStorage.getItem(isCorrectKey);
            const $form = $(`#${formId}`);
            const $input = $(`#${inputId}`);

            if (isCompleted || isCorrect) {
                $input.prop('disabled', true).css('background-color', '#ccc');
                if ($input.is('input[type="text"]')) {
                    $input.attr('type', 'password').val('********');
                }
            }

            var $button = $("<button>", {
                type: 'button',
                class: 'kapow-submit-btn',
                text: isCompleted || isCorrect ? 'Completed' : 'Submit',
                css: {
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: isCompleted || isCorrect ? '#28a745' : '#007bff', // Green for completed
                    color: 'white',
                    fontSize: '16px',
                    cursor: isCompleted || isCorrect ? 'default' : 'pointer',
                    transition: 'background-color 0.2s'
                },
                disabled: isCompleted || isCorrect,
                click: function () {
                    var answer = sanitizeHTML($input.val());
                    if (answer === correctAnswers[i]) {
                        displayAlert('Correct Answer!', 'green', i);
                        $input.prop('disabled', true).attr('type', 'password').val('********').css('background-color', '#ccc');
                        $(this).css('backgroundColor', '#28a745').text('Completed').prop('disabled', true);
                        localStorage.setItem(isCorrectKey, 'true');
                        localStorage.setItem(isCompletedKey, 'true');
                    } else {
                        displayAlert('Incorrect Answer! Please try again.', 'red', i);
                    }
                }
            });

            var $alertDiv = $("<div>", { class: 'kapow-alert' });
            $form.append($button).append($alertDiv);
        }
    };

    function sanitizeHTML(str) {
        var temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function displayAlert(message, color, formNumber) {
        var alertDiv = $(`#flag-form${formNumber} .kapow-alert`);
        alertDiv.text(message).css('color', color);
        setTimeout(function () {
            alertDiv.text('');
        }, 5000);
    }

    // Initialize forms based on the local storage
    add_submit_btns_to_forms();

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(add_submit_btns_to_forms, 1000);
        });
    }
});

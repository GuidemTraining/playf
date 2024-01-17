$(document).ready(function () {
    // Dictionary of correct answers for each form
    var correctAnswers = {
        "1": "correctAnswer1", // Replace with the actual answer for form 1
        "2": "correctAnswer2", // Replace with the actual answer for form 2
        // ...
        "10": "correctAnswer10" // Replace with the actual answer for form 10
    };

    // Function to create a submit button for a given form
    const add_submit_btn = function (formNumber) {
        var isCompleted = localStorage.getItem(`isCompleted${formNumber}`);
        var isCorrect = localStorage.getItem(`isCorrect${formNumber}`);
        
        var $button = $("<button>", {
            text: 'Submit',
            class: 'kapow-submit-btn',
            css: {
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            }
        }).click(function () {
            if (isCorrect) {
                return;
            }
            var answer = sanitizeHTML($(`#flag-input${formNumber}`).val());
            if (answer === correctAnswers[formNumber]) {
                displayAlert("Correct Answer!", "green", formNumber);
                $(this).prop("disabled", true).text("Completed");
                localStorage.setItem(`isCompleted${formNumber}`, 'true');
                localStorage.setItem(`isCorrect${formNumber}`, 'true');
            } else {
                displayAlert("Incorrect Answer! Please try again.", "red", formNumber);
            }
        });

        var $alertDiv = $("<div>", { class: 'kapow-alert' });
        
        $(`#flag-form${formNumber}`).append($button, $alertDiv);

        if (isCompleted || isCorrect) {
            $button.prop("disabled", true).text("Completed");
            $(`#flag-input${formNumber}`).prop("disabled", true).css("background-color", "#ccc");
        }
    };

    // Function to sanitize HTML input
    function sanitizeHTML(str) {
        var temp = document.createElement("div");
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Function to display an alert message
    function displayAlert(message, color, formNumber) {
        var $alertDiv = $(`#flag-form${formNumber} .kapow-alert`);
        $alertDiv.text(message).css("color", color);
        setTimeout(function () {
            $alertDiv.text("");
        }, 5000);
    }

    // Function to add submit buttons to all forms
    function add_submit_buttons_to_all_forms() {
        for (let i = 1; i <= 10; i++) {
            add_submit_btn(i);
        }
    }

    // Initial call to add submit buttons to all forms
    add_submit_buttons_to_all_forms();

    // Thinkific CoursePlayerV2 hooks
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(add_submit_buttons_to_all_forms, 1000);
        });
    }
});

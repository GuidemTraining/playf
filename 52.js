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
        // Check if the user has already completed or submitted the correct answer
        var isCompleted = localStorage.getItem(`isCompleted${formNumber}`);
        var isCorrect = localStorage.getItem(`isCorrect${formNumber}`);

        // Create a div with a submit button
        var $div = $("<div>", { class: 'kapow-submit' });
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
        });

        // Add a div for the alert message
        var $alertDiv = $("<div>", { class: 'kapow-alert' });

        // Append the button and alert div to the form
        $(`#flag-form${formNumber}`).append($div.append($button), $alertDiv);

        // Disable the button and input if the task is already completed
        if (isCompleted || isCorrect) {
            $button.addClass("completed").text("Completed").prop("disabled", true);
            $(`#flag-input${formNumber}`).prop("disabled", true).css("background-color", "#ccc");
        }

        // Add click event handler to the submit button
        $button.click(function () {
            if ($(this).hasClass("completed")) {
                return; // Do nothing if the task is already completed
            }
            var answer = sanitizeHTML($(`#flag-input${formNumber}`).val());
            var correctAnswer = correctAnswers[formNumber];

            if (answer === correctAnswer) {
                $(this).addClass("completed").text("Completed").prop("disabled", true);
                $(`#flag-input${formNumber}`).prop("disabled", true).css("background-color", "#ccc");
                displayAlert("Correct Answer!", "green", formNumber);
                localStorage.setItem(`isCorrect${formNumber}`, 'true');
                localStorage.setItem(`isCompleted${formNumber}`, 'true');
            } else {
                displayAlert("Incorrect Answer! Please try again.", "red", formNumber);
            }
        });
    };

    // Function to sanitize HTML input
    function sanitizeHTML(str) {
        var temp = document.createElement("div");
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Function to display an alert message
    function displayAlert(message, color, formNumber) {
        var alertDiv = $(`#flag-form${formNumber} .kapow-alert`);
        alertDiv.text(message).css("color", color);
        setTimeout(function () {
            alertDiv.text("");
        }, 5000);
    }

    // Add submit button to each form
    for (let i = 1; i <= 10; i++) {
        add_submit_btn(i);
    }

    // Thinkific CoursePlayerV2 hooks
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(add_submit_buttons_to_all_forms, 1000);
        });
    }
});

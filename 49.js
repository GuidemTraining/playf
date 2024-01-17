4$(document).ready(function () {
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
        var $div = $("<div class='kapow-submit'>");
        $(`#flag-form${formNumber}`).append($div);
        var button_style = "padding: 10px; border: none; border-radius: 4px; background-color: #007bff; color: white; font-size: 16px; cursor: pointer; transition: background-color 0.2s;";
        var button_html = `<button class='kapow-submit-btn' style='${button_style}'>Submit</button>`;
        $div.append(button_html);
        var alertDiv = $("<div class='kapow-alert'></div>");
        $div.append(alertDiv);

        var isCorrectAnswer = false;

        if (isCompleted) {
            $(`.kapow-submit-btn`, `#flag-form${formNumber}`).addClass("completed").text("Completed").prop("disabled", true);
            $(`#flag-input${formNumber}`).prop("disabled", true).css("background-color", "#ccc");
        }

        if (isCorrect) {
            displayAlert("Correct Answer!", "green", formNumber);
            isCorrectAnswer = true;
            $(`.kapow-submit-btn`, `#flag-form${formNumber}`).addClass("completed").text("Completed").prop("disabled", true);
            $(`#flag-input${formNumber}`).prop("disabled", true).css("background-color", "#ccc");
        }

        $(`.kapow-submit-btn`, `#flag-form${formNumber}`).click(function () {
            if (isCorrectAnswer) {
                return;
            }

            var answer = $(`#flag-input${formNumber}`).val();
            answer = sanitizeHTML(answer);
            var correctAnswer = correctAnswers[formNumber];

            if (answer === correctAnswer) {
                $(this).addClass("completed").text("Completed").prop("disabled", true);
                $(`#flag-input${formNumber}`).prop("disabled", true).css("background-color", "#ccc");
                displayAlert("Correct Answer!", "green", formNumber);
                isCorrectAnswer = true;
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
        var alertDiv = $(`.kapow-alert`, `#flag-form${formNumber}`);
        alertDiv.text(message).css("color", color);
        setTimeout(function () {
            alertDiv.text("");
        }, 5000);
    }

    // Add submit button to each form
    for (let i = 1; i <= 10; i++) {
        add_submit_btn(i);
    }
});

// Additional code for CoursePlayerV2, if applicable
if (typeof (CoursePlayerV2) !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        setTimeout(function () {
            for (let i = 1; i <= 10; i++) {
                add_submit_btn(i);
            }
        }, 1000);
    });
}

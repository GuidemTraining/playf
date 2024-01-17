$(document).ready(function () {
    // Function to add a submit button and setup event handling for a given form
    const add_submit_btn = function (formNumber) {
        // Check if the user has already completed or submitted the correct answer
        var isCompleted = localStorage.getItem(`isCompleted${formNumber}`);
        var isCorrect = localStorage.getItem(`isCorrect${formNumber}`);

        // Select the form and input based on formNumber
        var $form = $(`#flag-form${formNumber}`);
        var $input = $(`#flag-input${formNumber}`);

        // Create the submit button with styling
        var $button = $(`<button class='kapow-submit-btn' type='button'>Submit</button>`).css({
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s"
        });

        // Add the button and the alert div to the form
        var $alertDiv = $("<div class='kapow-alert'></div>");
        $form.append($button, $alertDiv);

        // Disable the button and input if the task is already completed
        if (isCompleted || isCorrect) {
            $button.addClass("completed").text("Completed").prop("disabled", true);
            $input.prop("disabled", true).css("background-color", "#ccc");
        }

        // Event handler for the submit button
        $button.click(function () {
            // Check if the answer is correct
            var answer = sanitizeHTML($input.val());
            var correctAnswer = "correctAnswer" + formNumber; // You need to define the correct answer for each form

            if (answer === correctAnswer) {
                $button.addClass("completed").text("Completed").prop("disabled", true);
                $input.prop("disabled", true).css("background-color", "#ccc");
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

    // Add a submit button to each form
    for (let i = 1; i <= 10; i++) {
        add_submit_btn(i);
    }
});

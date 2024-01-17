$(document).ready(function () {
    // Dictionary of correct answers for each form
    var correctAnswers = {
        "1": "correctAnswer1",
        "2": "correctAnswer2",
        // ...
        "10": "correctAnswer10"
    };

    // Function to validate the answer
    function validateAnswer(formNumber, providedAnswer) {
        return providedAnswer === correctAnswers[formNumber];
    }

    // Function to add a submit button to each form
    const add_submit_btns_to_forms = function () {
        // Iterate over each form and add a submit button
        for (let i = 1; i <= 10; i++) {
            const formId = `flag-form${i}`;
            const inputId = `flag-input${i}`;
            const $form = $(`#${formId}`);
            
            // Check if form exists
            if ($form.length === 0) {
                console.warn(`Form with ID ${formId} not found.`);
                continue;
            }

            // Create the submit button
            const $button = $('<button>', {
                type: 'button',
                class: 'kapow-submit-btn',
                text: 'Submit',
                css: {
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                click: function () {
                    // Handle the click event for the submit button
                    const providedAnswer = $(`#${inputId}`).val();
                    const isCorrect = validateAnswer(i.toString(), providedAnswer);
                    if (isCorrect) {
                        // Correct answer logic
                        alert(`Correct answer for form ${formId}`);
                    } else {
                        // Incorrect answer logic
                        alert(`Incorrect answer for form ${formId}. Try again.`);
                    }
                }
            });

            // Append the button to the form
            $form.append($button);
        }
    };

    // Add submit buttons to forms when the document is ready
    add_submit_btns_to_forms();

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(add_submit_btns_to_forms, 1000);
        });
    }
});

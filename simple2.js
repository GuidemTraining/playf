$(document).ready(function () {
    // Function to create and append a submit button to a given form
    function add_submit_btn(formNumber) {
        var $form = $("#flag-form" + formNumber);
        if ($form.length === 0) {
            // If the form does not exist, log an error and exit the function
            console.error("Form with ID flag-form" + formNumber + " not found.");
            return;
        }

        var $button = $("<button>", {
            type: 'button',
            class: 'kapow-submit-btn',
            text: 'Submit'
        });

        var $alertDiv = $("<div>", {
            class: 'kapow-alert'
        });

        // Append the button and alert div to the form
        $form.append($button, $alertDiv);
    }

    // Function to add submit buttons to all forms
    function add_submit_buttons_to_all_forms() {
        for (let i = 1; i <= 10; i++) {
            add_submit_btn(i);
        }
    }

    // Check if Thinkific CoursePlayerV2 is defined
    if (typeof CoursePlayerV2 !== 'undefined') {
        // If CoursePlayerV2 is defined, set up a hook for content change
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(add_submit_buttons_to_all_forms, 1000);
        });
    } else {
        // If CoursePlayerV2 is not defined, just add the submit buttons
        add_submit_buttons_to_all_forms();
    }
});

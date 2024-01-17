$(document).ready(function () {
    // Function to add a submit button to each form
    const add_submit_btns_to_forms = function () {
        // Iterate over each form and add a submit button
        for (let i = 1; i <= 10; i++) {
            const formId = `flag-form${i}`;
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
                }
            }).click(function () {
                // Handle the click event for the submit button
                // Your logic for form submission goes here
                console.log(`Submit button clicked for form ${formId}`);
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

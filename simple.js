$(document).ready(function () {
    // Function to create and append a submit button to a given form
    function add_submit_btn(formNumber) {
        var button_html = "<button class='kapow-submit-btn'>Submit</button>";
        var alertDiv = "<div class='kapow-alert'></div>";

        // Append the button and alert div to the form
        $("#flag-form" + formNumber).append(button_html).append(alertDiv);
    }

    // Add a submit button to each form
    for (let i = 1; i <= 10; i++) {
        add_submit_btn(i);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Get references to the form, input field, and submit button
    var form = document.getElementById("flag-form");
    var inputField = document.getElementById("flag-input");
    var submitButton = document.getElementById("submit-button");

    // Add an event listener to the form
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the value entered in the input field
        var answer = inputField.value;

        // Perform your validation here (replace this with your validation logic)
        if (answer === "correct") {
            alert("Answer is correct!"); // Display a success message (you can customize this)
        } else {
            alert("Answer is incorrect."); // Display an error message (you can customize this)
        }
    });
});

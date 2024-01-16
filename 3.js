document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("flag-form");
    var inputField = document.getElementById("flag-input");
    var submitButton = document.getElementById("submit-button");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        var answer = inputField.value;

        if (answer === "correctthis") {
            inputField.value = "Answer is correct!";
        } else {
            inputField.value = "Answer is incorrect!";
        }
    });
});

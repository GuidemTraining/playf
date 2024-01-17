document.addEventListener("DOMContentLoaded", function () {
  // Function to add submit button and set up the logic for each form
  const add_submit_btn = function (formId, inputId) {
    // Check if the user has already completed or submitted the correct answer for this form
    var isCompleted = localStorage.getItem('isCompleted_' + formId);
    var isCorrect = localStorage.getItem('isCorrect_' + formId);

    // Create a div with a submit button for this form
    var $div = $("<div class='kapow-submit'>");
    $("#" + formId).append($div);

    // Create a div for the alert message for this form
    var alertDiv = $("<div class='kapow-alert'></div>");
    $div.append(alertDiv);

    // Variable to track if the answer is correct and completed for this form
    var isCorrectAnswer = false;

    // Check if the user has already completed for this form
    if (isCompleted) {
      // If completed, disable the button and input field, and set the button color to green for this form
      $("#" + formId + " .kapow-submit-btn").css("background-color", "green");
      $("#" + formId + " .kapow-submit-btn").prop("disabled", true);
      $("#" + inputId).prop("disabled", true);
      $("#" + inputId).css("background-color", "#ccc");

      // Change the input field text to asterisks for this form
      $("#" + inputId).val("********");

      // Change the submit button text to "Completed" for this form
      $("#" + formId + " .kapow-submit-btn").text("Completed");
    }

    // Check if the user has already submitted the correct answer for this form
    if (isCorrect) {
      // If already correct, display a success message for this form
      displayAlert("Correct Answer!", "green", formId);
      isCorrectAnswer = true;
    }

    // Add click event handler to the submit button for this form
    $("#" + formId + " .kapow-submit-btn").click(function () {
      if (isCorrectAnswer) {
        return; // Do nothing if the answer is already correct for this form
      }

      var answer = $("#" + inputId).val();

      // Sanitize the answer to prevent XSS
      answer = sanitizeHTML(answer);

      // Check if the answer is correct
      if (answer === "correctthis") {
        // Change the button color to green for this form
        $("#" + formId + " .kapow-submit-btn").css("background-color", "green");

        // Disable the button for this form
        $("#" + formId + " .kapow-submit-btn").prop("disabled", true);

        // Disable the input field and make it grayed out for this form
        $("#" + inputId).prop("disabled", true);
        $("#" + inputId).css("background-color", "#ccc");

        // Display a success message for this form
        displayAlert("Correct Answer!", "green", formId);

        // Set isCorrect to true and store it in local storage for this form
        isCorrectAnswer = true;
        localStorage.setItem('isCorrect_' + formId, 'true');
      } else {
        // If the answer is incorrect, display an error message for this form
        displayAlert("Incorrect Answer! Please try again.", "red", formId);
      }
    });
  }

  // Function to sanitize HTML input
  function sanitizeHTML(str) {
    var temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  // Function to display an alert message for a specific form
  function displayAlert(message, color, formId) {
    var alertDiv = $("#" + formId + " .kapow-alert");
    alertDiv.text(message);
    alertDiv.css("color", color);

    // Automatically hide the alert after 5 seconds
    setTimeout(function () {
      alertDiv.text("");
    }, 5000);
  }

  // Call add_submit_btn for each form
  add_submit_btn("flag-form1", "flag-input1");
  add_submit_btn("flag-form2", "flag-input2");
  // Add more forms as needed
});

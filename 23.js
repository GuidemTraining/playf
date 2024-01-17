$(document).ready(function () {
  const add_submit_btn = function () {
    // Check if the user has already completed or submitted the correct answer
    var isCompleted = localStorage.getItem('isCompleted');
    var isCorrect = localStorage.getItem('isCorrect');

    // Create a div with a submit button
    var $div = $("<div class='kapow-submit'>");
    $("#kapow-form").append($div);
    var button_style = "padding: 10px; border: none; border-radius: 4px; background-color: #007bff; color: white; font-size: 16px; cursor: pointer; transition: background-color 0.2s;";
    var button_html = "<div class='kapow-submit-btn' style='" + button_style + "'><span class='submit-text' style='padding-left: 5px;'>Submit</span></div>";
    $div.append(button_html);

    // Add a div for the alert message
    var alertDiv = $("<div class='kapow-alert'></div>");
    $div.append(alertDiv);

    // Variable to track if the answer is correct
    var isCorrectAnswer = false;

    // Check if the user has already completed
    if (isCompleted) {
      // If completed, mark the button as completed and disable it
      $(".kapow-submit-btn").addClass("completed");
      $(".kapow-submit-btn").text("Completed");
      $(".kapow-submit-btn").prop("disabled", true);
      // Disable the input field and make it grayed out
      $("#flag-input").prop("disabled", true);
      $("#flag-input").css("background-color", "#ccc"); // Apply grayed-out style
    }

    // Check if the user has already submitted the correct answer
    if (isCorrect) {
      // If already correct, display a success message
      displayAlert("Correct Answer!", "green");
      isCorrectAnswer = true;
      // Change the button text to "Completed" and mark it as completed
      $(".kapow-submit-btn").addClass("completed");
      $(".kapow-submit-btn").text("Completed");
      // Disable the button
      $(".kapow-submit-btn").prop("disabled", true);
      // Disable the input field and make it grayed out
      $("#flag-input").prop("disabled", true);
      $("#flag-input").css("background-color", "#ccc"); // Apply grayed-out style
    }

    // Add click event handler to the submit button
    $(".kapow-submit .kapow-submit-btn").click(function () {
      if (isCorrectAnswer) {
        return; // Do nothing if the answer is already correct
      }

      var answer = $("#flag-input").val();

      // Sanitize the answer to prevent XSS
      answer = sanitizeHTML(answer);

      // Check if the answer is correct
      if (answer === "correctthis") {
        // Change the button text to "Completed" and mark it as completed
        $(".kapow-submit-btn").addClass("completed");
        $(".kapow-submit-btn").text("Completed");
        // Disable the button
        $(".kapow-submit-btn").prop("disabled", true);
        // Disable the input field and make it grayed out
        $("#flag-input").prop("disabled", true);
        $("#flag-input").css("background-color", "#ccc"); // Apply grayed-out style

        // Display a success message
        displayAlert("Correct Answer!", "green");

        // Set isCorrect to true and store it in local storage
        isCorrectAnswer = true;
        localStorage.setItem('isCorrect', 'true');

        // Mark the task as completed and store it in local storage
        $(".kapow-submit-btn").addClass("completed");
        $(".kapow-submit-btn").text("Completed");
        localStorage.setItem('isCompleted', 'true');
      } else {
        // If the answer is incorrect, display an error message
        displayAlert("Incorrect Answer! Please try again.", "red");
      }
    });
  }

  if (typeof (CoursePlayerV2) !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
      setTimeout(function () {
        add_submit_btn();
      }, 1000);
    });
  } else {
    add_submit_btn();
  }

  // Function to sanitize HTML input
  function sanitizeHTML(str) {
    var temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  // Function to display an alert message
  function displayAlert(message, color) {
    var alertDiv = $(".kapow-alert");
    alertDiv.text(message);
    alertDiv.css("color", color);

    // Automatically hide the alert after 5 seconds
    setTimeout(function () {
      alertDiv.text("");
    }, 5000);
  }
});

$(document).ready(function () {
  const add_submit_btn = function () {
    // Create a div with a submit button
    var $div = $("<div class='kapow-submit'>");
    $("#flag-form").append($div);
    var button_style = "padding: 10px; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background-color 0.2s;";
    var button_html = "<div class='kapow-submit-btn' style='" + button_style + "'><span class='submit-text' style='padding-left: 5px;'>Submit</span></div>";
    $div.append(button_html);

    // Add a div for the alert message
    var alertDiv = $("<div class='kapow-alert'></div>");
    $div.append(alertDiv);

    // Add click event handler to the submit button
    $(".kapow-submit .kapow-submit-btn").click(function () {
      var answer = $("#flag-input").val();

      // Sanitize the answer to prevent XSS
      answer = sanitizeHTML(answer);

      // Check if the answer is correct
      if (answer === "correctthis") {
        // Display the submitted answer next to the button
        displayAlertMessage("Submitted Answer: " + answer, alertDiv);

        // Change the button color to green
        $(".kapow-submit-btn").css("background-color", "green");

        // Disable the button
        $(".kapow-submit-btn").prop("disabled", true);
      } else {
        // If the answer is incorrect, display an alert message
        alert("Answer is incorrect!");
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

  // Function to display the alert message next to the button
  function displayAlertMessage(message, alertDiv) {
    alertDiv.text(message);
  }
});

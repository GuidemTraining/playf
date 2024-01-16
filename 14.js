$(document).ready(function () {
  const add_submit_btn = function () {
    // Create a div with a submit button
    var $div = $("<div class='kapow-submit'>");
    $("#flag-form").append($div);
    var button_style = "padding: 10px; border: none; border-radius: 4px; background-color: #007bff; color: white; font-size: 16px; cursor: pointer; transition: background-color 0.2s;";
    var button_html = "<div class='kapow-submit-btn' style='" + button_style + "'><span class='submit-text' style='padding-left: 5px;'>Submit</span></div>";
    $div.append(button_html);

    // Add click event handler to the submit button
    $(".kapow-submit .kapow-submit-btn").click(function () {
      var answer = $("#flag-input").val();

      // Sanitize the answer to prevent XSS
      answer = sanitizeHTML(answer);

      // Check if the answer is correct
      if (answer === "correctthis") {
        // Display the answer in a Toastify alert with a green checkmark emoji
        displayAlert("Correct Answer: " + answer, "#008000", true);

        // Disable input field and button
        $("#flag-input").prop("disabled", true);
        $(".kapow-submit-btn").css("background-color", "#5cb85c").off("click");
      } else {
        // Display the answer in a Toastify alert with a red "X" emoji
        displayAlert("Incorrect Answer: " + answer, "#ff0000", false);
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

  // Function to display an alert message with emojis
  function displayAlert(message, color, isCheck) {
    var alertMessage = $("<div class='alert-message'></div>");
    alertMessage.css("color", color);

    if (isCheck) {
      alertMessage.html("<span>&#x2714;</span> " + message); // Checkmark emoji
    } else {
      alertMessage.html("<span>&#x2718;</span> " + message); // X emoji
    }

    alertDiv.empty().append(alertMessage);

    // Automatically hide the alert after 5 seconds
    setTimeout(function () {
      alertMessage.fadeOut("slow");
    }, 5000);
  }
})

$(document).ready(function () {
  const add_submit_btn = function (formId, correctAnswer) {
    var $form = $(formId);
    var $input = $form.find('input[type="text"]');
    var $button = $form.find('.kapow-submit-btn');
    var $alert = $form.find('.kapow-alert');

    var isCompleted = localStorage.getItem(formId + '-isCompleted');
    var isCorrect = localStorage.getItem(formId + '-isCorrect');

    if (isCompleted || isCorrect) {
      $button.addClass("completed").text("Completed").prop("disabled", true);
      $input.prop("disabled", true).css("background-color", "#ccc");
      displayAlert(formId, "Correct Answer!", "green");
      return;
    }

    $button.click(function () {
      var answer = $input.val();
      answer = sanitizeHTML(answer);

      if (answer === correctAnswer) {
        displayAlert(formId, "Correct Answer!", "green");
        localStorage.setItem(formId + '-isCorrect', 'true');
        localStorage.setItem(formId + '-isCompleted', 'true');
        $button.addClass("completed").text("Completed").prop("disabled", true);
        $input.prop("disabled", true).css("background-color", "#ccc");
      } else {
        displayAlert(formId, "Incorrect Answer! Please try again.", "red");
      }
    });
  }

  // Initialize each form with its correct answer
  add_submit_btn('#flag-form1', 'correctAnswer1');
  add_submit_btn('#flag-form2', 'correctAnswer2');
  // Add more forms as needed...

  // Sanitize HTML input
  function sanitizeHTML(str) {
    var temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  // Display an alert message
  function displayAlert(formId, message, color) {
    var $alert = $(formId + ' .kapow-alert');
    $alert.text(message).css("color", color).show();
    setTimeout(function () {
      $alert.hide();
    }, 5000);
  }
});

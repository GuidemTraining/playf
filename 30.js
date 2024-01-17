$(document).ready(function () {
  $('.kapow-submit-btn').click(function () {
    // Determine which form's submit button was clicked
    var formId = $(this).closest('.kapow-form').attr('id');
    var inputId = '#' + $(this).prev('input[type="text"]').attr('id');
    var isCompleted = localStorage.getItem(formId + '-isCompleted');
    var isCorrect = localStorage.getItem(formId + '-isCorrect');
    
    // Define correct answers for each form
    var correctAnswers = {
      'flag-form1': 'correctAnswer1',
      'flag-form2': 'correctAnswer2'
    };
    
    if (isCompleted || isCorrect) {
      displayAlert(formId, "Already completed or correct!", "green");
      return;
    }

    var answer = $(inputId).val();
    answer = sanitizeHTML(answer);

    // Check if the answer is correct for the specific form
    if (answer === correctAnswers[formId]) {
      displayAlert(formId, "Correct Answer!", "green");
      localStorage.setItem(formId + '-isCorrect', 'true');
      localStorage.setItem(formId + '-isCompleted', 'true');
      $(this).text("Completed").prop("disabled", true);
      $(inputId).prop("disabled", true).css("background-color", "#ccc");
    } else {
      displayAlert(formId, "Incorrect Answer! Please try again.", "red");
    }
  });

  function sanitizeHTML(str) {
    var temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  function displayAlert(formId, message, color) {
    var alertDiv = $('#' + formId + ' .kapow-alert');
    alertDiv.text(message).css("color", color);
    setTimeout(function () {
      alertDiv.text("");
    }, 5000);
  }
});

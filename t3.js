$(document).ready(function () {
  // Function to add a submit button to each form
  const add_submit_btns_to_forms = function () {
    // Iterate over each form and add a submit button
    for (let i = 1; i <= 10; i++) {
      const formId = `flag-form${i}`;
      const inputId = `flag-input${i}`;
      const isCompletedKey = `isCompleted${i}`;
      const isCorrectKey = `isCorrect${i}`;
      const isCompleted = localStorage.getItem(isCompletedKey);
      const isCorrect = localStorage.getItem(isCorrectKey);

      // Create a div with a submit button
      var $div = $("<div>", { class: 'kapow-submit' });
      var $button = $("<button>", {
        type: 'button',
        class: 'kapow-submit-btn',
        text: isCompleted || isCorrect ? 'Completed' : 'Submit',
        css: {
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '16px',
          cursor: isCompleted || isCorrect ? 'default' : 'pointer',
          transition: 'background-color 0.2s'
        },
        disabled: isCompleted || isCorrect
      }).click(function () {
        // Check if the answer is correct
        var answer = sanitizeHTML($(`#${inputId}`).val());
        if (answer === "correctAnswer" + i) { // Replace with your actual logic to check the answer
          displayAlert("Correct Answer!", "green", i);
          $(this).text("Completed").prop("disabled", true);
          localStorage.setItem(isCompletedKey, 'true');
          localStorage.setItem(isCorrectKey, 'true');
        } else {
          displayAlert("Incorrect Answer! Please try again.", "red", i);
        }
      });

      // Create a div for the alert message
      var $alertDiv = $("<div>", { class: 'kapow-alert' });
      
      // Append the button and alert div to the form
      $(`#${formId}`).append($button).append($alertDiv);
      
      // Disable the input field and make it grayed out if completed or correct
      if (isCompleted || isCorrect) {
        $(`#${inputId}`).prop("disabled", true).css("background-color", "#ccc");
      }
    }
  };

  // Function to sanitize HTML input
  function sanitizeHTML(str) {
    var temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  // Function to display an alert message
  function displayAlert(message, color, formNumber) {
    var alertDiv = $(`#flag-form${formNumber} .kapow-alert`);
    alertDiv.text(message).css("color", color);
    setTimeout(function () {
      alertDiv.text("");
    }, 5000);
  }

  // Add submit buttons to forms when the document is ready
  add_submit_btns_to_forms();

  // Thinkific CoursePlayerV2 hook logic (if applicable)
  if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
      setTimeout(add_submit_btns_to_forms, 1000);
    });
  }
});

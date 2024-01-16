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

      // Here you can perform your submit logic with 'answer' variable

      // For demonstration, let's just display an alert message
      alert("Submitted Answer: " + answer);
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
})

$(document).ready(function(){
  const add_submit_btn = function(){
    // Create a div with a submit button
    var $div = $("<div class='kapow-submit'>");
    $("#flag-form").append($div);  
    var button_style = "color: #ffffff; cursor: pointer; display: flex; align-items: center; background-color: #007bff; padding: 0.3rem 0.8rem; width: 140px; text-align: center; font-size: 0.9rem; line-height: 1.2rem; border-radius: 0 0 0.375rem 0.375rem; margin-left: auto;";
    var button_html = "<div class='kapow-submit-btn' style='" + button_style + "'><span class='submit-text' style='padding-left: 5px;'>Submit</span></div>";
    $div.append(button_html);

    // Add click event handler to the submit button
    $(".kapow-submit .kapow-submit-btn").click(function(){
      var answer = $("#flag-input").val();

      // Here you can perform your submit logic with 'answer' variable

      // For demonstration, let's just display an alert message
      alert("Submitted Answer: " + answer);
    });
  }

  if(typeof(CoursePlayerV2) !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function(data) {
      setTimeout(function() {
        add_submit_btn();
      }, 1000);  
    });
  }  else {
    add_submit_btn();
  }
})

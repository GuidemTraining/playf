$(document).ready(function(){
  // Add click event handler to the existing submit button
  $("#cwr-button").click(function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    var answer = $("#flag-input").val();

    if (answer === "correctthis") {
        $("#flag-input").val("Answer is correct!");
    } else {
        $("#flag-input").val("Answer is incorrect!");
    }
  });

  // Disable the default form behavior when the form is submitted
  $("#flag-form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission
  });
});

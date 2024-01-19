$(document).ready(function() {
  // Variables to hold data for later use
  var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail;

  // Check if CoursePlayerV2 is defined
  if (typeof(CoursePlayerV2) !== 'undefined') {
    // Listen for the content change event
    CoursePlayerV2.on('hooks:contentDidChange', function(data) {
      // Extract and assign course, lesson, chapter, and user details from data
      courseId = data.course.id;
      courseName = data.course.name;
      courseSlug = data.course.slug;
      lessonId = data.lesson.id;
      lessonName = data.lesson.name;
      lessonSlug = data.lesson.slug;
      chapterName = data.chapter.name;
      chapterId = data.chapter.id;
      userId = data.user.id;
      userName = data.user.full_name;
      userEmail = data.user.email;
    });
  }

  // Initialize Toastr notifications
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
  };

  // Event delegation for handling button clicks
  $(document).on('click', '.guidem-button', function() {
    const form = $(this).closest('.guidem-form');
    if (form.length) {
      const inputValue = form.find('input[type="text"]').val();
      const questionId = form.data('question-id');

      // Replace the following line with your actual check for correct or incorrect answer
      const isAnswerCorrect = inputValue === "CorrectAnswer"; // Replace with actual logic

      if (!isAnswerCorrect) {
        // Handle incorrect answer
        toastr.error('Incorrect answer');
        // Other logic for incorrect answers...
      } else {
        // Handle correct answer
        $(this).text('Completed').css('background-color', 'green').prop('disabled', true);
        toastr.success('Correct answer');

        // Prepare the data object with captured variables
        var submissionData = {
          courseId: courseId,
          courseName: courseName,
          courseSlug: courseSlug,
          lessonId: lessonId,
          lessonName: lessonName,
          lessonSlug: lessonSlug,
          chapterId: chapterId,
          chapterName: chapterName,
          userId: userId,
          userEmail: userEmail,
          questionId: questionId,
          answer: inputValue
        };

        // Simulate sending the data with AJAX
        console.log("Simulated data sent to server:", submissionData);
        // Uncomment the following AJAX call to actually send data
        /*
        $.ajax({
          url: '/your-server-endpoint', // Replace with your server endpoint
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(submissionData),
          success: function(response) {
            toastr.success('Data sent successfully');
          },
          error: function(xhr, status, error) {
            toastr.error('Error sending data');
          }
        });
        */
      }
    }
  });
});

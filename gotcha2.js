// Initialize Toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
};

document.addEventListener('DOMContentLoaded', function() {
  let incorrectCount = 0; // Initialize incorrect answer count
  let lastIncorrectTime = 0; // Initialize timestamp for the last incorrect answer

  // Event delegation for handling button clicks
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('guidem-button')) {
      const form = event.target.closest('.guidem-form');
      if (form) {
        const inputValue = form.querySelector('input[type="text"]').value;
        const questionId = form.getAttribute('data-question-id');

        // Assume 'data' is available in your script with the required structure
        // Extract course, lesson, chapter, and user details
        var courseId = data.course.id;
        var courseName = data.course.name;
        var courseSlug = data.course.slug;
        var lessonId = data.lesson.id;
        var lessonName = data.lesson.name;
        var lessonSlug = data.lesson.slug;
        var chapterName = data.chapter.name;
        var chapterId = data.chapter.id;
        var userId = data.user.id;
        var userEmail = data.user.email;

        // Check if the answer is incorrect
        const correctAnswers = ['GOODMODE1', 'GOODMODE2', 'GOODMODE3']; // Replace with your correct answers
        if (!correctAnswers.includes(inputValue)) {
          incorrectCount++; // Increment incorrect answer count
          const currentTime = new Date().getTime();

          // Check if conditions are met to disable submit button
          if (incorrectCount >= 5 && (currentTime - lastIncorrectTime) <= 10000) {
            disableSubmitButton(); // Disable submit button for 10 seconds
            setTimeout(enableSubmitButton, 10000); // Enable submit button after 10 seconds
          } else if (incorrectCount >= 10 && (currentTime - lastIncorrectTime) <= 60000) {
            disableSubmitButton(); // Disable submit button for 5 minutes
            setTimeout(enableSubmitButton, 300000); // Enable submit button after 5 minutes
          }

          lastIncorrectTime = currentTime; // Update last incorrect time
          showNotification('Incorrect', 'error');
        } else {
          event.target.textContent = 'Completed';
          event.target.style.backgroundColor = 'green';
          event.target.disabled = true; // Disable the button
          showNotification('Correct', 'success');
        }

        // Simulate sending data to server
        sendDataToServer(questionId, inputValue, courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterId, chapterName, userId, userEmail);
      }
    }
  });

  // Functions to show notifications using Toastr
  function showNotification(message, type) {
    toastr[type](message);
  }

  // Function to simulate sending data to the server
  function sendDataToServer(questionId, answer, courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterId, chapterName, userId, userEmail) {
    // Prepare the data object to send to the server
    var submissionData = {
      questionId: questionId,
      answer: answer,
      courseId: courseId,
      courseName: courseName,
      courseSlug: courseSlug,
      lessonId: lessonId,
      lessonName: lessonName,
      lessonSlug: lessonSlug,
      chapterId: chapterId,
      chapterName: chapterName,
      userId: userId,
      userEmail: userEmail
    };

    // Simulate sending the data
    console.log("Simulated data sent to server:", submissionData);
  }

  // Function to disable the submit button
  function disableSubmitButton() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

  // Function to enable the submit button
  function enableSubmitButton() {
    const buttons = document.querySelectorAll('.guidem-button');
    buttons.forEach(button => {
      button.disabled = false;
    });
  }
});

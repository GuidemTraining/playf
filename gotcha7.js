$(document).ready(function() {
  // Variables to hold data for later use
  var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail, userFirstName;
  var incorrectAttempts = 0; // Track incorrect attempts
  var banEndTime = 0; // Time when the ban ends (initially set to 0)
  var completedTasks = 0; // Track completed tasks
  var totalTasks = 10; // Total number of tasks/questions

  // Function to check if the user is banned
  function isBanned() {
    const currentTime = Date.now();
    return banEndTime > currentTime;
  }

  // Function to reset incorrect attempts and ban time
  function resetIncorrectAttempts() {
    incorrectAttempts = 0;
    banEndTime = 0;
  }

  // Function to display a hint modal for a specific question ID
  function showHintModal(questionId, hint) {
    // Create a Bootstrap modal element
    const modal = `
      <div class="modal fade custom-modal" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="hintModalLabel">Hint</h5>
            </div>
            <div class="modal-body">
              ${hint}
            </div>
          </div>
        </div>
      </div>
    `;

    // Append the modal to the body and show it
    $('body').append(modal);
    $('#hintModal').modal('show');
  }

  // Function to get specific answers for question IDs
  function getSpecificAnswer(questionId) {
    if (questionId === 1) {
      return "BLOOD";
    } else if (questionId === 2) {
      return "BOOTS";
    } else {
      return ""; // Return an empty string for other question IDs
    }
  }

  // Function to update the progress bar
  function updateProgressBar(completed, total) {
    const progressBar = document.getElementById('progress-bar');
    const percentage = (completed / total) * 100;
    progressBar.style.width = percentage + '%';
    // Update progress text if you have an element for it
    const progressText = document.getElementById('progress-text');
    if (progressText) {
      progressText.textContent = `Your Progress: ${completed}/${total}`;
    }
  }

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
      userFirstName = data.user.first_name; // Store user's first name
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
    if (isBanned()) {
      toastr.error(`Hi ${userFirstName}, you are temporarily banned from submitting answers.`);
      return;
    }

    const form = $(this).closest('.guidem-form');
    if (form.length) {
      const inputValue = String(form.find('input[type="text"]').val()); // Always treat input as a string
      const questionId = form.data('question-id');

      // Validate the input to ensure it's not empty
      if (inputValue.trim() === '') {
        toastr.error(`Hi ${userFirstName}, please enter an answer.`);
        return; // Don't proceed with submission if input is empty
      }

      // Check if there's an ongoing cooldown for incorrect attempts
      if (incorrectAttempts > 0) {
        if (incorrectAttempts <= 5) {
          // Display a blue notification for the first 5 seconds cooldown
          toastr.info(`Whoa not so fast we are hackers too! 5 Second Cooldown!`, null, { "backgroundColor": "#3498db" });
        }
        return; // Don't proceed with submission during cooldown
      }

      // Get the specific answer for the question ID
      const specificAnswer = getSpecificAnswer(questionId);

      if (!specificAnswer) {
        // If specific answer is not defined for the question ID, perform the usual check
        const isAnswerCorrect = inputValue === "CorrectAnswer"; // Replace with actual logic

        if (!isAnswerCorrect) {
          // Handle incorrect answer
          toastr.error(`Hi ${userFirstName}, incorrect answer`);
          incorrectAttempts++;

          // Start the 5-second cooldown for incorrect submissions
          setTimeout(function() {
            resetIncorrectAttempts();
          }, 5000);
        } else {
          // Handle correct answer
          completedTasks++; // Increment completed tasks
          updateProgressBar(completedTasks, totalTasks); // Update progress bar

          form.find('input[type="text"]').prop('disabled', true);
          $(this).text('Completed').css('background-color', 'green').prop('disabled', true);
          toastr.success(`Hi ${userFirstName}, correct answer`);

          // Reset incorrect attempts on correct answer
          resetIncorrectAttempts();

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

          // Sending the data with AJAX
          $.ajax({
            url: 'https://sb1.guidem.ph/submitdata' // Replace with your server endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(submissionData),
            success: function(response) {
              toastr.success(`Hi ${userFirstName}, data sent successfully`);
            },
            error: function(xhr, status, error) {
              toastr.error(`Hi ${userFirstName}, error sending data`);
            }
          });
        }
      } else {
        // Handle specific answers
        if (inputValue.toUpperCase() === specificAnswer) {
          // Handle correct specific answer
          completedTasks++; // Increment completed tasks
          updateProgressBar(completedTasks, totalTasks); // Update progress bar

          form.find('input[type="text"]').prop('disabled', true);
          $(this).text('Completed').css('background-color', 'green').prop('disabled', true);
          toastr.success(`Hi ${userFirstName}, correct answer`);

          // Reset incorrect attempts on correct answer
          resetIncorrectAttempts();

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

          // Sending the data with AJAX
          $.ajax({
            url: 'https://sb1.guidem.ph/submitdata', // Replace with your server endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(submissionData),
            success: function(response) {
              toastr.success(`Hi ${userFirstName}, data sent successfully`);
            },
            error: function(xhr, status, error) {
              toastr.error(`Hi ${userFirstName}, error sending data`);
            }
          });
        } else {
          // Handle incorrect specific answer
          toastr.error(`Hi ${userFirstName}, incorrect answer`);
          incorrectAttempts++;

          // Start the 5-second cooldown for incorrect submissions
          setTimeout(function() {
            resetIncorrectAttempts();
          }, 5000);
        }
      }
    }
  });

  // Event delegation for handling hint button clicks
  $(document).on('click', '.guidem-hint-button', function() {
    const form = $(this).closest('.guidem-form');
    if (form.length) {
      const questionId = form.data('question-id');
      let hint;

      // Retrieve hint based on questionId
      if (questionId === 1) {
        hint = "Hint 1: This is a hint for question ID 1.";
      } else if (questionId === 2) {
        hint = "Hint 2: This is a hint for question ID 2.";
      } else {
        hint = "No hint available for this question.";
      }

      showHintModal(questionId, hint); // Call the function to show the hint modal
    }
  });
});

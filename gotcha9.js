$(document).ready(function() {
    // USER DATA VARIABLES
    var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail, userFirstName;
    var incorrectAttempts = 0, banEndTime = 0, completedTasks = 0, totalTasks = 0;
  
    // USER BANNING MANAGEMENT - Check if the user is currently banned
    function isBanned() {
      return Date.now() < banEndTime;
    }
  
    // Resets incorrect attempts and ban time
    function resetIncorrectAttempts() {
      incorrectAttempts = 0;
      banEndTime = 0;
    }
  
    // DATA SUBMISSION - Get the current submission timestamp
    function getSubmissionTimestamp() {
      return new Date().toISOString();
    }
  
    // TASK MANAGEMENT - Count the number of buttons in a lesson
    function countButtonsInLesson(lessonContent) {
      return lessonContent.find('.guidem-button').length;
    }
  
    // Update the total number of tasks based on lesson content
    function updateTotalTasks(lessonContent) {
      totalTasks = countButtonsInLesson(lessonContent);
    }
  
    // Update the progress bar based on task completion
    function updateProgressBar(completed, total) {
      var progressPercentage = (completed / total) * 100;
      $('#progressBar').css('width', progressPercentage + '%').attr('aria-valuenow', progressPercentage);
    }
  
    // Check if the answer is correct (Placeholder function)
    function checkAnswer(questionId, inputValue) {
      // Implement your answer checking logic here
      return false; // default to false
    }
  
    // Retrieves the specific answer for a question (Placeholder function)
    function getSpecificAnswer(questionId) {
      // Implement your specific answer retrieval logic here
      return null; // default to null
    }
  
    // Show the hint modal for a given question
    function showHintModal(questionId, hint) {
      if ($('#hintModal').hasClass('show')) {
        return;
      }
      const modal = `
        <div class="modal fade custom-modal" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="hintModalLabel">Hint</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">${hint}</div>
            </div>
          </div>
        </div>`;
      $('body').append(modal);
      $('#hintModal').modal('show');
      $('#hintModal').on('hidden.bs.modal', function () {
        $(this).remove();
      });
    }
  
    // Retrieves the hint for a specific question
    function getHintForQuestion(questionId) {
      switch(questionId) {
        case 1: return "Hint for Question 1: [Your Hint Here]";
        case 2: return "Hint for Question 2: [Your Hint Here]";
        default: return "No hint available for this question.";
      }
    }
  
    // EVENT HANDLING - Consolidated event handler for '.guidem-button' clicks
    $(document).on('click', '.guidem-button', function() {
      if (isBanned()) {
        toastr.error(`Hi ${userFirstName}, You are temporarily banned from submitting answers.`);
        return;
      }
      const form = $(this).closest('.guidem-form');
      if (form.length) {
        const inputValue = form.find('input[type="text"]').val().trim();
        const questionId = form.data('question-id');
        
        if (inputValue === '') {
          toastr.error(`Hi ${userFirstName}, please enter an answer.`);
          return;
        }
        if (incorrectAttempts > 0) {
          toastr.info(`You need to wait before trying again.`);
          return;
        }
  
        const isAnswerCorrect = checkAnswer(questionId, inputValue);
        if (!isAnswerCorrect) {
          toastr.error(`Incorrect answer.`);
          incorrectAttempts++;
          banEndTime = Date.now() + 5000;
          setTimeout(resetIncorrectAttempts, 5000);
        } else {
          handleCorrectAnswer(form, questionId, inputValue);
        }
      }
    });
  
    function handleCorrectAnswer(form, questionId, inputValue) {
      completedTasks++;
      updateProgressBar(completedTasks, totalTasks);
      form.find('input[type="text"]').prop('disabled', true);
      form.find('.guidem-button').text('Completed').css('background-color', 'green').prop('disabled', true);
      toastr.success(`Correct answer!`);
      resetIncorrectAttempts();
      submitAnswerData(questionId, inputValue);
    }
  
    function submitAnswerData(questionId, answer) {
      var submissionData = {
        courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterId, chapterName, userId, userEmail, questionId, answer, 
        timestamp: getSubmissionTimestamp(),
        userFirstName
      };
      $.ajax({
        url: 'https://sb1.guidem.ph/submitdata',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(submissionData),
        error: function(xhr, status, error) {
          toastr.error(`Error submitting answer. Please try again.`);
        }
      });
    }
  
    // Event delegation for handling hint button clicks
    $(document).on('click', '.guidem-hint-button', function() {
      if (isBanned()) {
        toastr.error(`You are temporarily banned from using hints.`);
        return;
      }
      const form = $(this).closest('.guidem-form');
      if (form.length) {
        const questionId = form.data('question-id');
        const hint = getHintForQuestion(questionId);
        showHintModal(questionId, hint);
      }
    });
  
    // Close modal when clicking outside or pressing escape key
    $(document).on('click keydown', function(event) {
      if ($(event.target).hasClass('modal') || (event.key === "Escape" && $('#hintModal').hasClass('show'))) {
        $('#hintModal').modal('hide');
      }
    });
  
    // CoursePlayerV2 content change event listener
    if (typeof(CoursePlayerV2) !== 'undefined') {
      CoursePlayerV2.on('hooks:contentDidChange', function(data) {
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
        userFirstName = data.user.first_name;
      });
    }
    // Initialize Toastr notifications
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: 5000,
        onShown: function() { console.log('Toast is visible'); },
        onHidden: function() { console.log('Toast is hidden'); }
      };
  
      // OTHER INTERACTIONS
      // Implement any other necessary event handlers or logic here.
      // For example, handling clicks on additional custom elements, etc.
  
      // Initialize any other UI components that your application requires
      // For instance, if you have a datepicker, slider, etc.
  
      // FINAL SETUP AND INITIALIZATION
      // Perform any final setup or initialization tasks here.
      // For example, loading initial data, setting up the UI state, etc.
  
      function loadDataFromServer() {
        // AJAX call to load data or any initial setup
        console.log('Data loading from server...');
        // Implement AJAX call and data handling logic
      }
  
      function setupInitialUIState() {
        // Logic to set the initial UI state based on loaded data or user preferences
        console.log('Setting up initial UI state...');
        // Implement your UI setup logic here
      }
  
      // Call any initial functions you've defined
      loadDataFromServer();
      setupInitialUIState();
  });
  

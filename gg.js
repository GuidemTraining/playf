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
        $('.guidem-form input[type="text"]').prop('disabled', false);
    }

    // Function to display a hint modal for a specific question ID
    function showHintModal(questionId, hint) {
        // Check if a modal already exists, if so, remove it
        if ($('#hintModal').length) {
            $('#hintModal').remove();
        }

        // Create a Bootstrap modal element
        const modal = `
            <div class="modal fade custom-modal" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="hintModalLabel">Hint</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                toastr.info(`Hi ${userFirstName}, please wait for cooldown.`);
                return; // Don't proceed with submission during cooldown
            }

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
            let hint = "No hint available for this question.";

            // Retrieve hint based on questionId
            if (questionId === 1) {
                hint = "Hint 1: The life force within us.";
            } else if (questionId === 2) {
                hint = "Hint 2: These are made for walking.";
            }

            showHintModal(questionId, hint); // Call the function to show the hint modal
        }
    });

    // Close modal on outside click
    $(document).on('click', (e) => {
        if ($(e.target).hasClass('modal-backdrop')) {
            $('.modal').modal('hide');
        }
    });

    // Re-enable input fields on page load in case they were disabled
    $('.guidem-form input[type="text"]').prop('disabled', false);
});

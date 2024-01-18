document.addEventListener('DOMContentLoaded', function() {
    console.log("Script initialized.");

    // Function to toggle the accordion
    function toggleAccordion(button) {
        // Skip the first accordion
        if (button.classList.contains('first')) {
            return;
        }

        if (!button.classList.contains('locked')) {
            var content = button.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            button.classList.toggle('expanded');
        }
    }

    // Check if all conditions in the first accordion are met
    function checkCompletion() {
        var allCompleted = true; // Placeholder for your completion logic
        // Add your specific completion logic here

        console.log("Checking completion: ", allCompleted);

        if (allCompleted) {
            document.querySelectorAll('.accordion .accordion-button').forEach(function(button, index) {
                if (index > 0) {
                    button.classList.remove('locked');
                    button.querySelector('i').classList.remove('fa-lock');
                    button.querySelector('i').classList.add('fa-unlock');
                    console.log("Unlocked accordion ", index + 1);
                }
            });
        }
    }

    // Initialize accordions
    document.querySelectorAll('.accordion .accordion-button').forEach(function(button, index) {
        if (index > 0) {
            button.classList.add('locked');
            button.querySelector('i').classList.remove('fa-check', 'fa-unlock');
            button.querySelector('i').classList.add('fa-lock');
        }

        // Add 'first' class to the first accordion button for special handling
        if (index === 0) {
            button.classList.add('first');
            button.nextElementSibling.style.display = 'block';
        }

        button.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });

    // Placeholder for adding an event listener or other logic for completion check
    // Update this based on your specific completion criteria
    checkCompletion();
});

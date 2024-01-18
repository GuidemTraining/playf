// Function to initialize accordion functionality
function initializeAccordion() {
    var accButtons = document.querySelectorAll('.accordion .accordion-button');

    // Lock accordions 2 to 4 initially
    accButtons.forEach(function(btn, index) {
        if (index > 0) {
            btn.classList.add('locked');
        }
    });

    accButtons.forEach(function(btn, index) {
        // Initially hide content if not expanded
        if (!btn.classList.contains('expanded')) {
            btn.nextElementSibling.style.display = 'none';
        }

        // Attach event listener for each button
        btn.addEventListener('click', function() {
            if (!this.classList.contains('locked')) {
                var content = this.nextElementSibling;
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                this.classList.toggle('expanded');
            } else {
                console.log("Accordion " + (index + 1) + " is locked.");
            }
        });
    });

    // Define your completion criteria here for unlocking
    // This is a placeholder function
    function checkCompletionCriteria() {
        // Replace with your actual completion logic
        // For now, it just returns true for demonstration
        return true;
    }

    // Call this function based on specific actions in your first accordion
    // For demonstration, calling it directly
    if (checkCompletionCriteria()) {
        accButtons.forEach(function(btn, index) {
            if (index > 0) {
                btn.classList.remove('locked');
                console.log("Accordion " + (index + 1) + " is unlocked.");
            }
        });
    }
}

// MutationObserver to watch for changes in the DOM
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            console.log("DOM changed, reinitializing accordions.");
            initializeAccordion();
        }
    });
});

// Start observing the document body for DOM changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initialize accordion functionality on page load
initializeAccordion();

// Function to initialize accordion functionality
function initializeAccordion() {
    var accButtons = document.querySelectorAll('.accordion .accordion-button');
    accButtons.forEach(function(btn) {
        // Initially hide content if not expanded
        if (!btn.classList.contains('expanded')) {
            btn.nextElementSibling.style.display = 'none';
        }

        // Attach event listener for each button
        btn.addEventListener('click', function() {
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                this.classList.remove('expanded');
            } else {
                content.style.display = 'block';
                this.classList.add('expanded');
            }
        });
    });
}

// MutationObserver to watch for changes in the DOM
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
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

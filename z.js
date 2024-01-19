$(document).ready(function () {
    // Event delegation for handling button clicks
    $(document).on('click', '.guidem-button', function() {
        const form = $(this).closest('.guidem-form');
        if (form.length) {
            const inputValue = form.find('input[type="text"]').val();
            console.log("Button clicked. Input Value: ", inputValue);

            // Add your logic here to handle the input value
        }
    });

    // Observer for any DOM changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Add any specific logic here if needed when new nodes are added
            }
        });
    });

    // Configuration for the observer
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    // Additional logic for CoursePlayerV2, if needed
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            // Handle CoursePlayerV2 content change
        });
    }
});

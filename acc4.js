window.onload = function() {
    console.log("Window loaded, script starting.");

    // Function to toggle accordion
    function toggleAccordion(button) {
        var content = button.nextElementSibling;

        // Debugging: Log the current state of the accordion content
        console.log("Toggling accordion content display. Current display state: ", content.style.display);

        if (content.style.display === 'block') {
            content.style.display = 'none';
            button.classList.remove('expanded');
            console.log("Content hidden.");
        } else {
            content.style.display = 'block';
            button.classList.add('expanded');
            console.log("Content shown.");
        }
    }

    // Select all accordion buttons
    var accButtons = document.querySelectorAll('.accordion .accordion-button');
    console.log("Found ", accButtons.length, " accordion buttons.");

    accButtons.forEach(function(btn, index) {
        // Initially hide all contents except for the first expanded one
        if (!btn.classList.contains('expanded')) {
            btn.nextElementSibling.style.display = 'none';
        }

        // Attach click event listener to each button
        btn.addEventListener('click', function() {
            console.log("Accordion button ", index, " clicked.");
            toggleAccordion(this);
        });
    });
};

function setupAccordion() {
    var accButtons = document.querySelectorAll('.accordion .accordion-button');
    if (accButtons.length > 0) {
        console.log("Found ", accButtons.length, " accordion buttons.");

        accButtons.forEach(function(btn, index) {
            if (!btn.classList.contains('expanded')) {
                btn.nextElementSibling.style.display = 'none';
            }

            btn.addEventListener('click', function() {
                console.log("Accordion button ", index, " clicked.");
                toggleAccordion(this);
            });
        });
    } else {
        console.log("No accordion buttons found, checking again in 500ms.");
        setTimeout(setupAccordion, 500); // Retry after 500ms
    }
}

function toggleAccordion(button) {
    var content = button.nextElementSibling;
    console.log("Toggling accordion content. Current display state: ", content.style.display);
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

// Start the setup process
setupAccordion();

document.addEventListener('DOMContentLoaded', function() {
    // Select all accordion buttons
    var accButtons = document.querySelectorAll('.accordion-button');

    accButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Toggle the "expanded" class
            this.classList.toggle('expanded');

            // Select the next element (which should be the content)
            var content = this.nextElementSibling;

            // Toggle the display of the accordion content
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

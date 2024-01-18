document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            const accordionContent = this.nextElementSibling;
            const allAccordionContents = document.querySelectorAll('.accordion-content');
            const allAccordionButtons = document.querySelectorAll('.accordion-button');

            if (!accordionContent.style.display || accordionContent.style.display === 'none') {
                // Close all accordion sections
                allAccordionContents.forEach(function (content) {
                    content.style.display = 'none';
                });
                // Remove 'expanded' class from all buttons
                allAccordionButtons.forEach(function (button) {
                    button.classList.remove('expanded');
                });
                // Open the clicked section
                accordionContent.style.display = 'block';
                // Add 'expanded' class to the clicked button
                this.classList.add('expanded');
            } else {
                // Close the clicked section
                accordionContent.style.display = 'none';
                // Remove 'expanded' class from the clicked button
                this.classList.remove('expanded');
            }

            // Disable buttons for the 2nd to 4th accordion
            if (index > 0) {
                accordionButtons[1].querySelector('button').disabled = true;
                accordionButtons[2].querySelector('button').disabled = true;
                accordionButtons[3].querySelector('button').disabled = true;
            }
        });
    });
});

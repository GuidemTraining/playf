$(document).ready(function () {
    // Function to handle accordion button clicks
    $('.accordion-button').click(function () {
        const accordionContent = $(this).next('.accordion-content');
        const allAccordionContents = $('.accordion-content');
        
        if (!accordionContent.is(':visible')) {
            // Close all accordion sections
            allAccordionContents.slideUp();
            // Open the clicked section
            accordionContent.slideDown();
            // Remove 'expanded' class from all buttons
            $('.accordion-button').removeClass('expanded');
            // Add 'expanded' class to the clicked button
            $(this).addClass('expanded');
        } else {
            // Close the clicked section
            accordionContent.slideUp();
            // Remove 'expanded' class from the clicked button
            $(this).removeClass('expanded');
        }
    });
});

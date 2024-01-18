document.addEventListener('DOMContentLoaded', function () {
    // Find all elements with the class "guidem-form"
    const guidemForms = document.querySelectorAll('.guidem-form');
    
    // Iterate through each "guidem-form" element and add a "Submit" button
    guidemForms.forEach(form => {
        // Create a new button element
        const button = document.createElement('button');
        
        // Add the class "guidem-button" to the button
        button.classList.add('guidem-button');
        
        // Set the button text to "Submit"
        button.textContent = 'Submit';
        
        // Append the button to the "guidem-form" element
        form.appendChild(button);
    });
});

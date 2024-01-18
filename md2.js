// Function to open a modal-like notification window
function openModalNotificationWindow() {
    console.log('Opening modal-like notification window');
    
    // Create a modal-like container
    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '50%';
    modalContainer.style.left = '50%';
    modalContainer.style.transform = 'translate(-50%, -50%)';
    modalContainer.style.backgroundColor = 'white';
    modalContainer.style.border = '1px solid #ccc';
    modalContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    modalContainer.style.padding = '20px';
    modalContainer.style.zIndex = '9999';

    // Add content to the modal-like container (customize this content)
    modalContainer.innerHTML = `
        <h1>This is a Modal-like Notification</h1>
        <p>You can customize the content of your modal notification here.</p>
        <button id="closeModalButton">Close</button>
    `;

    // Create a close button within the modal
    const closeModalButton = modalContainer.querySelector('#closeModalButton');
    closeModalButton.addEventListener('click', () => {
        console.log('Closing modal-like notification window');
        document.body.removeChild(modalContainer);
    });

    // Append the modal-like container to the body
    document.body.appendChild(modalContainer);
}

// Wait for the document to be fully loaded before attaching the event listener
document.addEventListener('DOMContentLoaded', function() {
    // Find the button element by its ID
    const openModalButton = document.getElementById('openModalButton');

    // Attach a click event listener to the button
    openModalButton.addEventListener('click', () => {
        console.log('Button clicked, opening modal-like notification window');
        openModalNotificationWindow();
    });
});

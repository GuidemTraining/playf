// Function to create a modal-like notification window
function openModalNotificationWindow() {
    // Create a modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Create a close button
    const closeModalButton = document.createElement('span');
    closeModalButton.classList.add('close-modal-button');
    closeModalButton.textContent = '×';

    // Close modal button click event
    closeModalButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Create the modal text content
    const modalText = document.createElement('h2');
    modalText.textContent = 'This is a Modal-like Notification';

    const modalParagraph = document.createElement('p');
    modalParagraph.textContent = 'You can customize the content of your modal notification here.';

    // Append elements to the modal content
    modalContent.appendChild(closeModalButton);
    modalContent.appendChild(modalText);
    modalContent.appendChild(modalParagraph);

    // Append the modal content to the modal container
    modalContainer.appendChild(modalContent);

    // Append the modal container to the body
    document.body.appendChild(modalContainer);

    // Display the modal
    modalContainer.style.display = 'block';
}

// Function to create and attach a button that opens the modal
function createOpenModalButton() {
    const openModalButton = document.createElement('button');
    openModalButton.textContent = 'Open Modal Notification';

    // Attach a click event listener to the button
    openModalButton.addEventListener('click', openModalNotificationWindow);

    // Append the button to the body
    document.body.appendChild(openModalButton);
}

// Call the function to create and attach the button
createOpenModalButton();

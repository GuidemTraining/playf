// Get references to modal and buttons
const modal = document.createElement('div');
modal.id = 'cheatsheetModal';
modal.style.display = 'none';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

const closeModalButton = document.createElement('span');
closeModalButton.id = 'closeModalButton';
closeModalButton.className = 'close';
closeModalButton.innerHTML = '&times;';

const markdownInput = document.createElement('textarea');
markdownInput.id = 'markdownInput';
markdownInput.rows = '10';
markdownInput.cols = '50';
markdownInput.placeholder = 'Enter Markdown here';

const renderedMarkdown = document.createElement('div');
renderedMarkdown.id = 'renderedMarkdown';

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Function to render Markdown
function renderMarkdown() {
    const markdownText = markdownInput.value;
    const htmlText = marked(markdownText);
    renderedMarkdown.innerHTML = htmlText;
}

// Listen for changes in the input and render Markdown
markdownInput.addEventListener('input', renderMarkdown);

// Add elements to the modal
modalContent.appendChild(closeModalButton);
modalContent.appendChild(markdownInput);
modalContent.appendChild(renderedMarkdown);
modal.appendChild(modalContent);

// Button to open the modal
const openModalButton = document.createElement('button');
openModalButton.id = 'openModalButton';
openModalButton.innerHTML = 'Open Cheatsheet';
openModalButton.addEventListener('click', openModal);

// Append the button and modal to the body
document.body.appendChild(openModalButton);
document.body.appendChild(modal);

// Initial rendering
renderMarkdown();

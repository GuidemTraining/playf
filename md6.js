// Function to create a notification-style pop-up
function openNotificationPopup(message) {
    // Create a notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification-container');

    // Create the notification content
    const notificationContent = document.createElement('div');
    notificationContent.classList.add('notification-content');
    notificationContent.textContent = message;

    // Append the notification content to the notification container
    notificationContainer.appendChild(notificationContent);

    // Append the notification container to the Thinkific course content area
    const courseContent = document.querySelector('.course-content'); // Adjust the selector as needed
    if (courseContent) {
        courseContent.appendChild(notificationContainer);
    }

    // Automatically hide the notification after a delay (e.g., 5 seconds)
    setTimeout(() => {
        notificationContainer.style.display = 'none';
    }, 5000); // Adjust the delay as needed
}

// Function to create and attach a button that opens the notification
function createOpenNotificationButton() {
    const openNotificationButton = document.createElement('button');
    openNotificationButton.textContent = 'Show Notification';

    // Attach a click event listener to the button
    openNotificationButton.addEventListener('click', () => {
        openNotificationPopup('This is a notification. You can customize the message here.');
    });

    // Append the button to the Thinkific course content area
    const courseContent = document.querySelector('.course-content'); // Adjust the selector as needed
    if (courseContent) {
        courseContent.appendChild(openNotificationButton);
    }
}

// Call the function to create and attach the button
createOpenNotificationButton();

// Add an event listener for CoursePlayerV2 content changes
if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        // Reattach the button when the course content changes
        createOpenNotificationButton();
    });
}

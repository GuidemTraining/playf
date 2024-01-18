// Function to create a notification-like pop-up
function openNotificationPopup() {
    // Create a notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification-container');

    // Create the notification content
    const notificationContent = document.createElement('div');
    notificationContent.classList.add('notification-content');
    notificationContent.innerHTML = `
        <span class="close-notification-button">&times;</span>
        <h2>This is a Notification</h2>
        <p>You can customize the content of your notification here.</p>
    `;

    // Close notification button click event
    const closeNotificationButton = notificationContent.querySelector('.close-notification-button');
    closeNotificationButton.addEventListener('click', () => {
        notificationContainer.style.display = 'none';
    });

    // Append the notification content to the notification container
    notificationContainer.appendChild(notificationContent);

    // Append the notification container to the Thinkific course content area
    const courseContent = document.querySelector('.course-content'); // Adjust the selector as needed
    if (courseContent) {
        courseContent.appendChild(notificationContainer);
    }

    // Display the notification
    notificationContainer.style.display = 'block';

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
    openNotificationButton.addEventListener('click', openNotificationPopup);

    // Append the button to the Thinkific course content area
    const courseContent = document.querySelector('.course-content'); // Adjust the selector as needed
    if (courseContent) {
        courseContent.appendChild(openNotificationButton);
    }
}

// Call the function to create and attach the button
createOpenNotificationButton();

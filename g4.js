document.addEventListener('DOMContentLoaded', function () {
    const addClickEventToButtons = function () {
        for (let i = 1; i <= 10; i++) {
            const buttonId = `submit-button${i}`;
            const button = document.getElementById(buttonId);

            if (button) {
                button.addEventListener('click', function () {
                    alert('Answer submitted');
                    // Additional functionality can be added here
                });
            }
        }
    };

    // Initialize by adding click events to buttons
    addClickEventToButtons();

    // Thinkific CoursePlayerV2 hook logic (if applicable)
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(addClickEventToButtons, 1000);
        });
    }
});

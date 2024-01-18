document.addEventListener('DOMContentLoaded', function () {
    const addClickEventToButtons = function () {
        for (let i = 1; i <= 10; i++) {
            const buttonId = `submit-button${i}`;
            console.log("Looking for button with ID:", buttonId); // Debugging line
            const button = document.getElementById(buttonId);

            if (button) {
                console.log("Adding click event to:", buttonId); // Debugging line
                button.addEventListener('click', function () {
                    alert('Answer submitted');
                });
            } else {
                console.log("Button not found:", buttonId); // Debugging line
            }
        }
    };

    addClickEventToButtons();

    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            setTimeout(addClickEventToButtons, 1000);
        });
    }
});

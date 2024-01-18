<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Button Event Handling</title>
</head>
<body>
    <button id="myButton">Click Me</button>

    <script>
        function clickHandler() {
            alert('Button Clicked!');
        }

        // Initial event handler
        const button = document.getElementById('myButton');
        button.addEventListener('click', clickHandler);

        // Function to reload the event handler
        function reloadEventHandler() {
            button.removeEventListener('click', clickHandler);
            button.addEventListener('click', clickHandler);
        }

        // Reload the event handler every second
        setInterval(reloadEventHandler, 1000);
    </script>
</body>
</html>

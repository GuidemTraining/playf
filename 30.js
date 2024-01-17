<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flag Submission</title>
    <style>
        /* General Styles */
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            margin: 0;
        }
        /* Form Styles */
        .kapow-form {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
            display: flex;
            align-items: center;
            /* Align form items vertically */
            margin-bottom: 20px; /* Add spacing between forms */
        }
        .kapow-form input[type="text"] {
            width: 70%;
            /* Adjust the width as needed */
            padding: 10px;
            margin-right: 10px;
            /* Add spacing between input and button */
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        /* Add specific styles for submit buttons within forms */
        .kapow-form .kapow-submit-btn {
            flex: 1;
            /* Take up remaining space */
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .kapow-form .kapow-submit-btn:hover {
            background-color: #0056b3;
        }
        /* CSS to hide the button */
        button[data-qa="complete-continue__btn"] {
            display: none;
        }
    </style>
</head>
<body>
    <div class="kapow-form" id="flag-form1">
        <input type="text" placeholder="Enter the Answer here" required="">
        <div class="kapow-submit-btn"><span class="submit-text">Submit</span></div>
        <div class="kapow-alert"></div>
    </div>
    <div class="kapow-form" id="flag-form2">
        <input type="text" placeholder="Enter the Answer here" required="">
        <div class="kapow-submit-btn"><span class="submit-text">Submit</span></div>
        <div class="kapow-alert"></div>
    </div>
    <!-- Add more forms as needed -->
    <script src="script.js"></script>
</body>
</html>

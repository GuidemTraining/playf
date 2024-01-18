<script>
        document.getElementById("myForm").addEventListener("submit", function(event) {
            // Prevent the default form submission
            event.preventDefault();
            
            // Get the entered answer from the input field
            var answer = document.getElementById("answer").value;
            
            // Your custom JavaScript logic here
            // You can use the 'answer' variable to work with the entered value
            alert("Answer submitted: " + answer);
        });
    </script>

// Get the slide-in window
var slideWindow = document.getElementById('mySlideWindow');

// Get the button that opens the slide-in window
var btn = document.getElementById('slideBtn');

// Get the <span> element that closes the slide-in window
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the slide-in window
btn.onclick = function() {
    slideWindow.style.display = 'block';
    slideWindow.style.right = '0';
}

// When the user clicks on <span> (x), close the slide-in window
span.onclick = function() {
    slideWindow.style.right = '-250px';
    // Wait for the transition to finish before hiding the element
    setTimeout(function() {
        slideWindow.style.display = 'none';
    }, 500);
}

// When the user clicks anywhere outside of the slide-in window, close it
window.onclick = function(event) {
    if (event.target == slideWindow) {
        slideWindow.style.right = '-250px';
        setTimeout(function() {
            slideWindow.style.display = 'none';
        }, 500);
    }
}

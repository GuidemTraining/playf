document.addEventListener('DOMContentLoaded', function() {
    function toggleAccordion(button) {
        var content = button.nextElementSibling;
        if (!button.classList.contains('locked')) {
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
            button.classList.toggle('expanded');
        }
    }

    function checkCompletion() {
        var allCompleted = true;
        document.querySelectorAll('#gflag-form1 input').forEach(function(input) {
            if (input.value === '') allCompleted = false;
        });

        if (allCompleted) {
            document.querySelectorAll('.accordion .accordion-button').forEach(function(button, index) {
                if (index > 0) {
                    button.classList.remove('locked');
                    button.querySelector('i').classList.remove('fa-lock');
                    button.querySelector('i').classList.add('fa-unlock');
                }
            });
        }
    }

    document.querySelectorAll('.accordion .accordion-button').forEach(function(button, index) {
        if (index > 0) {
            button.classList.add('locked');
            button.querySelector('i').classList.remove('fa-check', 'fa-unlock');
            button.querySelector('i').classList.add('fa-lock');
        }

        button.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });

    document.querySelectorAll('#gflag-form1 input').forEach(function(input) {
        input.addEventListener('input', checkCompletion);
    });
});

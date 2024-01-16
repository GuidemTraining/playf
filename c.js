document.addEventListener("DOMContentLoaded", function () {
    var flagForm = document.getElementById("flag-form");

    if (flagForm) {
        var completeContinueBtn = document.querySelector('button[data-qa="complete-continue__btn"]');
        if (completeContinueBtn) {
            completeContinueBtn.disabled = true;
        }
    }
});

var inputs, submitButton, submitInput;

function shouldShowSubmitButton() {
    var i;
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value) {
            return true;
        }
    }
    return false;
}

function onInputChanged(e) {
    if (shouldShowSubmitButton()) {
        submitButton.className += ' active';
    } else {
        submitButton.className.replace(' active', '');
    }
}



window.onload = function() {
    inputs = document.querySelectorAll('.field input');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        input.addEventListener('input', onInputChanged);
    }
    submitButton = document.getElementById('submit-button');
    submitInput = document.getElementById('submit');
}
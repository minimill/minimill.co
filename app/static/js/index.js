var inputs, submitButton, submitInput, form, body, errorMessage;

function testInput(input) {
    return Boolean(input.value);
}

function onInputChanged(e) {
    console.log(inputs);
    if (inputs.every(testInput)) {
        body.className = 'active';
    } else if (inputs.some(testInput)) {
        body.className = 'disabled';
    } else {
        body.className = '';
    }
}

function formSuccess(e) {
    body.className = 'success';
}

function submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("submitting?");

    var xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            formSuccess();
        } else {
            var response = JSON.parse(xmlhttp.responseText);
            body.className = 'error';
            errorMessage.innerText = response.error.message;
        }
    }

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var csrf_token = document.getElementById('csrf_token').value;

    xmlhttp.open("POST", "", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("name=" + name + "&email=" + email +
                 "&message=" + message + "&csrf_token=" + csrf_token);
    return false;
}

window.onload = function() {
    form = document.getElementById('contact-form')[0];
    var inputsNl = document.querySelectorAll('.field input, .field textarea');
    inputs = [];
    for (var i = 0; i < inputsNl.length; i++) {
        var input = inputsNl[i];
        inputs.push(input);
        input.addEventListener('input', onInputChanged);
    }
    submitButton = document.getElementById('submit-button');
    submitInput = document.getElementById('submit');
    errorMessage = document.getElementById('error-message');
    body = document.getElementsByTagName('body')[0];
    submitButton.addEventListener('click', submitForm);
    form.onsubmit = submitForm;
}
var inputs, submitButton, submitInput, form, body, errorMessage, toName;

function testInput(input) {
    return Boolean(input.value);
}

function onInputChanged(e) {
    if (inputs.every(testInput)) {
        body.className = 'active';
    } else if (inputs.some(testInput)) {
        body.className = 'disabled';
    } else {
        body.className = '';
    }
    window.scrollTo(0,document.body.scrollHeight);
}

function submitForm(e) {
    e.preventDefault();

    var xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    var name = document.getElementById('minimill-name').value;
    var email = document.getElementById('minimill-email').value;
    var message = document.getElementById('minimill-message').value;
    var csrf_token = document.getElementById('minimill-csrf_token').value;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                toName.innerText = name;
                body.className = 'success';
            } else {
                var response = JSON.parse(xmlhttp.responseText);
                body.className = 'error';
                errorMessage.innerText = response.error.message;
            }
        }
    }

    xmlhttp.open("POST", "", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("name=" + name + "&email=" + email +
                 "&message=" + message + "&csrf_token=" + csrf_token);
    return false;
}

window.onload = function() {
    toName = document.getElementById('to-name');
    form = document.getElementById('contact-form');
    var message = document.getElementById('minimill-message');
    new Autogrow(message);
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
    submitButton.addEventListener('click', submitForm, false);
    submitInput.addEventListener('click', submitForm, false);
    form.addEventListener('submit', submitForm, false);
}
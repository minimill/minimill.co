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
        console.log('yes');
        submitButton.classList.add('active');
    } else {
        console.log('no');
        submitButton.classList.remove('active')
        console.log(submitButton.className);
    }
}

function submitForm(e) {
    e.preventDefault();

    var xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
        } else {
            var response = JSON.parse(xmlhttp.responseText);
            console.log('error: ', response);
        }
    }

    var name = document.getElementById('name').innerHTML;
    var email = document.getElementById('email').innerHTML;
    var message = document.getElementById('message').innerHTML;

    // xmlhttp.open("GET","your_url.php?name=" + name + "&email=" + email, true);
    // xmlhttp.open("POST","your_url.php",true);
    // xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // xmlhttp.send("name=" + name + "&email=" + email);
}

window.onload = function() {
    var form = document.getElementById('contact-form')[0];
    inputs = document.querySelectorAll('.field input, .field textarea');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        input.addEventListener('input', onInputChanged);
    }
    submitButton = document.getElementById('submit-button');
    submitInput = document.getElementById('submit');
    submitButton.addEventListener('click', submitForm);
    form.addEventListener('submit', submitForm);
}
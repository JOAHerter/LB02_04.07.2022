const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const passwort = document.getElementById('passwort');
const telefon = document.getElementById('telefon');
const geschlecht = document.getElementById('geschlecht');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email ist nicht gültig. Brauchen Sie samlpe@example.xx');
    }
}

function checkGeschlecht(input) {
    if (input.checked) {
        alert("Checkbox is CHECKED.");
    }
    else {
        alert("Checkbox is UNCHECKED.");
    }
}

function checkTelefon(input) {
    const re = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telefonnummer ist nicht gültig');
    }
}

function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} wird gebraucht`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} muss mehr als ${min} Zeichen haben`
        );
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} muss weniger als ${max} Zeichen haben`
        );
    } else {
        showSuccess(input);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
    if (!checkRequired([name, email, passwort, telefon, geschlecht])) {
        checkLength(name, 3, 15);
        checkLength(passwort, 6, 25);
        checkEmail(email);
        checkTelefon(telefon);
        checkGeschlecht(geschlecht)
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validateForm();
});
import { BASE_URL } from "../main.js";

export function surnameValidate(input) {
    const inputValue = input.value;
    let trimedValue = String(inputValue.replaceAll(/\s/g,'').toLowerCase());

    let result = /^[А-ЯЁ]+$/i.test(trimedValue);

    if (result) {
        return trimedValue;
    }

    return '';
}

export function nameValidate(input) {
    const inputValue = input.value;
    let trimedValue = String(inputValue.replaceAll(/\s/g,'').toLowerCase());

    let result = /^[А-ЯЁ]+$/i.test(trimedValue);

    if (result) {
        return trimedValue;
    }

    return '';
}

export function lastnameValidate(input) {
    const inputValue = input.value;
    let trimedValue = String(inputValue.replaceAll(/\s/g,'').toLowerCase());

    let result = /^[А-ЯЁ]+$/i.test(trimedValue);

    if (result) {
        return trimedValue;
    } else if (inputValue == '') {
        return '';
    }

    return false;
}


export function validation(surname, name, lastname) {
    if (surname && name && lastname) {
        return true;
    } else if (surname && name && lastname == '') {
        return true;
    } else {
        return false;
    }
}

export async function checkingRepeats(surname, name, lastname = '') {
    const response = await fetch(BASE_URL + '/api/clients');
    const data = await response.json();

    for (const client of data) {
        if (client.surname === surname && client.name === name && client.lastName === lastname) {
            return true;
        }
    }
}

export async function checkingRepeatsChange(surname, name, lastname = '', id) {
    const response = await fetch(BASE_URL + '/api/clients');
    const data = await response.json();

    const responseClient = await fetch(BASE_URL + `/api/clients/${id}`);
    const clientData = await responseClient.json();

    if (clientData.surname === surname && clientData.name === name && clientData.lastName === lastname) {
        return false;
    }

    for (const client of data) {
        if (client.surname === surname && client.name === name && client.lastName === lastname) {
            return true;
        }
    }
}

export function validatorError(formContacts) {
    const $error = document.createElement('p');

    $error.className = 'error';
    $error.textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!';

    let countOfErrors = document.getElementsByClassName('error');

    for (let i = 0; i < countOfErrors.length; i++) {
        countOfErrors[i].remove();
    }

    formContacts.after($error);

    return $error;
}

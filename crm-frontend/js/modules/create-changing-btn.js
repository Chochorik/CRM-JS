import { modalOverlay } from '../main.js';
import createContacts from './create-contacts-for-change.js';
import getContacts from './push-contacts.js';
import {surnameValidate, nameValidate, lastnameValidate, validation, checkingRepeatsChange, validatorError} from './validation.js';

export default function createChangeBtn(client) { // функция создания кнопки изменения клиента
    const $changeBtn = document.createElement('button'),
          modalClose = document.querySelector('.modal-change__close'),
          modalChange = document.querySelector('.modal__change'),
          deleteClient = document.querySelector('.modal-change__delete'),
          $changeSave = document.querySelector('.modal-change__save'),
          form = document.querySelector('.change-form__contacts');

    $changeBtn.className = 'change_btn';
    $changeBtn.textContent = 'Изменить';

    $changeBtn.addEventListener('click', async function(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/clients/${client.id}`);

        $changeBtn.dataset.id = client.id;

        const changeId = document.querySelector('.modal-change__id'),
              clientSurname = document.querySelector('.change-form__input-surname'),
              clientName = document.querySelector('.change-form__input-name'),
              clientLastname = document.querySelector('.change-form__input-lastname'),
              clientContactsDiv = document.querySelector('.change-form__contacts-list'),
              clientsInputPlaceholder = document.querySelectorAll('.placeholder-text__change'),
              clientContacts = document.querySelector('.change-form__contacts');

        clientContactsDiv.innerHTML = '';

        let clientsContacts = client.contacts;

        for (const placeholder of clientsInputPlaceholder) {
            placeholder.classList.add('notEmpty');
        }

        modalChange.classList.add('activeModal');
        modalOverlay.classList.add('activeModal');

        changeId.textContent = `ID: ${$changeBtn.dataset.id}`;
        clientSurname.value = client.surname;
        clientName.value = client.name;
        clientLastname.value = client.lastName;
        clientContacts.append(createContacts(clientsContacts));
    })

    deleteClient.addEventListener('click', async function(m) {
        m.preventDefault();

        const response = await fetch(`http://localhost:3000/api/clients/${$changeBtn.dataset.id}`, {
            method: 'DELETE',
        })
    })

    modalClose.addEventListener('click', function(e) {
        e.preventDefault();

        modalChange.classList.remove('activeModal');
        modalOverlay.classList.remove('activeModal');
    })

    // функция сохранения изменения клиента
    $changeSave.addEventListener('click', async function(e) {
        e.preventDefault();

        const surnameValue = document.querySelector('.change-form__input-surname'),
              nameValue = document.querySelector('.change-form__input-name'),
              lastNameValue = document.querySelector('.change-form__input-lastname'),
              contactsDiv2 = 'contactsDiv-1';

        let contactsValue = getContacts(contactsDiv2);

        // форматирование полей и валидация перед отправкой на сервер
        let resultSurname = String(surnameValidate(surnameValue)),
            resultName = String(nameValidate(nameValue)),
            resultLastName = String(lastnameValidate(lastNameValue));

        let name = resultName[0].toUpperCase() + resultName.substring(1),
            surname = resultSurname[0].toUpperCase() + resultSurname.substring(1),
            lastName;

        // проверка поля отчества на пустоту
        if (resultLastName === '') {
          lastName = '';
        } else {
            lastName = resultLastName[0].toUpperCase() + resultLastName.substring(1);
        }

        let resultValidator = validation(surname, name, lastName);

        if (resultValidator && resultLastName !== '') {
            let resultOfChecking = await checkingRepeatsChange(surname, name, lastName, client.id);

            if (!resultOfChecking) {
                const response = await fetch(`http://localhost:3000/api/clients/${$changeBtn.dataset.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        surname: surname,
                        lastName: lastName,
                        contacts: contactsValue,
                    })
                })
            } else {
                validatorError(form);
            }
        } else if (resultValidator && resultLastName === '') {
            let resultOfChecking = await checkingRepeatsChange(surname, name, client.id);

            const response = await fetch(`http://localhost:3000/api/clients/${$changeBtn.dataset.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: name,
                  surname: surname,
                  lastName: '',
                  contacts: contactsValue,
              })
          })
        } else {
            validatorError(form);
        }
    })

    return $changeBtn;
}

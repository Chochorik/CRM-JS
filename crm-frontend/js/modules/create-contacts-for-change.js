import { createSelect, createSelectList } from './create-contacts-select.js';
import createDelBtn from './create-contact-delete-btn.js';
import { $addContactBtn } from '../main.js';

export default function createContacts(array) { // функция создания контактов для изменения
    const $contactsDiv = document.querySelector('.change-form__contacts-list');

    for (const block of array) {
        const $contactsBlock = document.createElement('div'),
              $contactBlockSelect = createSelect(),
              $contactBlockInput = document.createElement('input'),
              $contactsDelete = createDelBtn($contactsBlock, $addContactBtn),
              $selectBlock = document.createElement('div'),
              $selectList = createSelectList($contactBlockSelect, $contactBlockInput);

        $contactsBlock.className = 'contactsDiv-1';
        $contactBlockSelect.className = 'contactsSelect selectBtn';
        $contactBlockInput.className = 'contactsInput';
        $selectBlock.className = 'selectBlock';

        $contactBlockSelect.addEventListener('click', function(e) {
          e.preventDefault();

          $selectList.classList.toggle('active');
        })

        $contactBlockSelect.value = block.type;
        $contactBlockSelect.textContent = block.type;

        $contactBlockInput.value = block.value;

        $selectBlock.append($contactBlockSelect);
        $selectBlock.append($selectList);
        $contactsBlock.append($selectBlock);
        $contactsBlock.append($contactBlockInput);
        $contactsBlock.append($contactsDelete);
        $contactsDiv.append($contactsBlock);
    }

    return $contactsDiv;
}

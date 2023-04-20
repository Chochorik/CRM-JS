export default function createDelBtn(contactBlock, addBtn) { // создание кнопки удаления контакта
  const $contactsDelete = document.createElement('button');

  $contactsDelete.className = 'contactsDelete';
  $contactsDelete.type = 'button';

  tippy($contactsDelete, {
      content: `<strong class="delete-btn-strong">Удалить контакт</strong>`,
      theme: 'darks',
      trigger: 'mouseenter focus',
      allowHTML: true,
  });

  $contactsDelete.addEventListener('click', function(e) {
      e.preventDefault();

      contactBlock.parentNode.removeChild(contactBlock);
      addBtn.classList.remove('addContact__disabled');
  })

  return $contactsDelete;
}

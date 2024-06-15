import { modalOverlay, BASE_URL } from '../main.js';

export default function createDeleteBtn(client) { // функция создания кнопки удаления клиента
  const $deleteBtn = document.createElement('button'),
        $modalDeleteBack = document.querySelector('.modal-delete__back'),
        $modalDeleteWindow = document.querySelector('.modal__delete'),
        $modalDeleteClose = document.querySelector('.modal__delete-close');

  $deleteBtn.className = 'delete_btn';
  $deleteBtn.textContent = 'Удалить';

  $deleteBtn.dataset.id = client.id;

  $deleteBtn.addEventListener('click', function(e) {
      e.preventDefault();

      const $modalDeleteConfirm = document.querySelector('.modal-delete__confirm-btn');

      $modalDeleteWindow.classList.add('activeModal');
      modalOverlay.classList.add('activeModal');

      $modalDeleteConfirm.addEventListener('click', async function(n) {
          n.preventDefault();

          const response = await fetch(BASE_URL + `/api/clients/${$deleteBtn.dataset.id}`, {
              method: 'DELETE',
          })

          renderingTable();
      })
  })

  $modalDeleteBack.addEventListener('click', function(e) {
      e.preventDefault();

      $modalDeleteWindow.classList.remove('activeModal');
      modalOverlay.classList.remove('activeModal')
  })

  $modalDeleteClose.addEventListener('click', function(e) {
      e.preventDefault();

      $modalDeleteWindow.classList.remove('activeModal');
      modalOverlay.classList.remove('activeModal')
  })

  return $deleteBtn;
}

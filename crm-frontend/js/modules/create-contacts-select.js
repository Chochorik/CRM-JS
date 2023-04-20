export function createSelect() { // создание селекта
    const $select = document.createElement('button');

    $select.type = 'button';

    $select.textContent = 'Телефон';
    $select.value = 'Телефон';

    $select.addEventListener('click', function(e) {
      e.preventDefault();

      $select.classList.toggle('active-btn');
    })

    return $select;
}

export function createSelectList(select, input) {
    const $selectList = document.createElement('div'),
          contactsArray = ['Телефон', 'Доп. телефон', 'Email', 'Vk', 'Facebook', 'Другое'];

    $selectList.className = 'selectList';

    for (const name of contactsArray) {
      const $selectElement = document.createElement('button'),
            inputMask = new Inputmask('+7 (999) 999-99-99');

      $selectElement.className = 'selectElem';
      $selectElement.type = 'button';

      $selectElement.textContent = name;
      $selectElement.value = name;

      $selectList.append($selectElement);

      $selectElement.addEventListener('click', function(e) {
          e.preventDefault();

          $selectList.classList.remove('active');
          select.classList.remove('active-btn');

          select.textContent = $selectElement.value;
          select.value = $selectElement.value;

          input.value = '';

          if (select.value == 'Телефон' || select.value == 'Доп. телефон') {
              input.placeholder = '+7 (___) ___-__-__';
              inputMask.mask(input);
          } else if (select.value == 'Email') {
              input.placeholder = 'Введите данные контакта'
              Inputmask.remove(input);
          } else if (select.value == 'Vk') {
              input.placeholder = 'Введите данные контакта'
              Inputmask.remove(input);
          } else if (select.value == 'Facebook') {
              input.placeholder = 'Введите данные контакта'
              Inputmask.remove(input);
          } else {
              input.placeholder = 'Введите данные контакта'
              Inputmask.remove(input);
          }
      })
    }

    return $selectList;
}

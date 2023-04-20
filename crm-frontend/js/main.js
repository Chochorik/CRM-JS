// импортируем все необходимые функции в основной файл
import {createSelect, createSelectList} from './modules/create-contacts-select.js';
import createDelBtn from './modules/create-contact-delete-btn.js';
import getContacts from './modules/push-contacts.js';
import getSortedClients from './modules/get-sorted-clients.js';
import newClientTR from './modules/new-client.js';
import {surnameValidate, nameValidate, lastnameValidate, validation, checkingRepeats, validatorError} from './modules/validation.js';

// экспорт необходимых констант для импортируемых функций
export const modalOverlay = document.getElementById('overlay-modal');
export const $addContactBtn = document.querySelector('.modal-add__add-field');

// главная функция
(() => {
    const $addingButton = document.querySelector('.main__create-client-btn'); // кнопка для добавления клиента

    const modalWindow = document.querySelector('.modal'), // модальное окно добавления клиента
          modalClose = document.querySelector('.modal__cross'), // кнопка закрытия модального окна
          modalBack = document.querySelector('.modal-add__back'), // кнопка отмены добавления клиента и закрытия модального окна
          modalAddClient = document.querySelector('.modal-add__save'); // кнопка сохранения клиента

    const $addClientLastname = document.querySelector('.input-lastname'); // инпут отчества в модальном окне для добавления клиента

    const $surnameInput = document.querySelector('.input-surname'), // инпут фамилии
          $nameInput = document.querySelector('.input-name'), // инпут имени
          $lastnameInput = document.querySelector('.input-lastname'), // инпут отчества
          contactsDiv1 = 'contactsDiv'; // блок для контактов

    const $inputs = document.querySelectorAll('.add-form__input'); // все инпуты

    const $addContactBtnChange = document.querySelector('.modal-change__add-field'); // модальное окно для изменения клиента

    let conacts, // счетчик блоков контактов в окне добавления клиента
        conacts2; // счетчик блоков контактов в окне измненения клиента

    let column = 'id'; // сортировка таблицы по id (по умолчанию)
    let columnDirection = true; // направление сортировки таблицы по возрастанию (по умолчанию)

    // функция для отключения прелоадера и включения кнопки добавления клиентов
    window.addEventListener('load', function() {
      const loading = document.querySelector('.loading__img'),
            loadingBlock = document.querySelector('.table__loading');

      loading.classList.add('loaded-hiding');
      $addingButton.classList.add('loaded-showing');
      loadingBlock.classList.add('loaded-hiding');

      window.setTimeout(function() {
          loading.classList.add('loaded');
          loadingBlock.classList.add('loaded');
          $addingButton.classList.remove('nonActive');
      }, 500);
    })

    // проверка вводимого в поле значения
    for (const input of $inputs) {
        input.addEventListener('input', function() {
            let inputValue = input.value;

            // проверка value с помощью регулярного выражения
            let regExp = /^[А-ЯЁ]+$/i.test(inputValue);

            if (!regExp) {
                input.classList.add('invalid__input');
            } else {
                input.classList.remove('invalid__input');
            }

            if (inputValue === '') {
                input.classList.remove('invalid__input');
            }
        })
    }

    // функция открытия модального окна создания клиента
    $addingButton.addEventListener('click', function(e) {
        e.preventDefault();

        let $contactsDiv = document.querySelector('.add-form__contacts-list');
        const error = document.querySelector('.error');
        const inputLastnamePlaceholder = document.querySelector('.placeholder-text_lastname')

        $contactsDiv.innerHTML = '';
        $surnameInput.value = $nameInput.value = '';
        $lastnameInput.value = '';

        inputLastnamePlaceholder.style = 'display: block;';

        if (error) {
            error.remove(error);
        }

        $addContactBtn.classList.remove('addContact__disabled');

        modalWindow.classList.add('activeModal');
        modalOverlay.classList.add('activeModal');
    })

    // добавление полей в модальное окно изменения контакта
    $addContactBtnChange.addEventListener('click', function(e) {
        e.preventDefault();
        const inputMask = new Inputmask('+7 (999) 999-99-99'); // импортируем маску телефона для соответствующих инпутов

        let $selectList;

        const $contactsBlock = document.createElement('div'), // создание блока, куда будут помещаться селект, инпут и кнопка удаления контакта
              $contactsDiv = document.querySelector('.change-form__contacts-list'), // блок, куда будут помещаться все контакты
              $contactBlockSelect = createSelect(), // создание селекта
              $contactBlockInput = document.createElement('input'), // создание инпута
              $contactsDelete = createDelBtn($contactsBlock, $addContactBtn), // создание кнопки удаления контакта
              $selectBlock = document.createElement('div');

        $contactsBlock.className = 'contactsDiv-1';
        $contactBlockSelect.className = 'selectBtn';
        $contactBlockInput.className = 'contactsInput';
        $selectBlock.className = 'selectBlock';

        $contactBlockInput.type = 'text';
        inputMask.mask($contactBlockInput);
        $contactBlockInput.placeholder = '+7 (___) ___-__-__';

        $selectList = createSelectList($contactBlockSelect, $contactBlockInput);

        $contactBlockSelect.addEventListener('click', function(e) {
            e.preventDefault();

            $selectList.classList.toggle('active');
        })

        // вкладываем все элементы в один
        $selectBlock.append($contactBlockSelect);
        $selectBlock.append($selectList);
        $contactsBlock.append($selectBlock);
        $contactsBlock.append($contactBlockInput);
        $contactsBlock.append($contactsDelete);
        $contactsDiv.append($contactsBlock);

        // счетчик блоков с контактами для ограничения кнопки добавления контактов
        conacts2 = document.getElementsByClassName('contactsDiv-1');

        if (conacts2.length == 10) {
            $addContactBtnChange.disabled = true;
            $addContactBtnChange.classList.add('addContact__disabled');
        } else {
            $addContactBtnChange.disabled = false;
            $addContactBtnChange.classList.remove('addContact__disabled');
        }

        $contactsDelete.addEventListener('click', function(e) {
            e.preventDefault();

            conacts2 = document.getElementsByClassName('contactsDiv-1');

            if (conacts2.length < 10) {
                $addContactBtnChange.disabled = false;
                $addContactBtnChange.classList.remove('addContact__disabled');
            } else if (conacts2.length == 9) {
                $addContactBtnChange.disabled = true;
                $addContactBtnChange.classList.add('addContact__disabled');
            }
        })

        return $contactsDiv;
    });

    // функция добавления поля контактов
    $addContactBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const inputMask = new Inputmask('+7 (999) 999-99-99');

        let $selectList;

        const $allContacts = document.querySelector('.add-form__contacts'),
              $contactsBlock = document.createElement('div'),
              $contactsDiv = document.querySelector('.add-form__contacts-list'),
              $contactBlockSelect = createSelect(),
              $contactBlockInput = document.createElement('input'),
              $contactsDelete = createDelBtn($contactsBlock, $addContactBtn),
              $selectBlock = document.createElement('div');

        $contactsBlock.className = 'contactsDiv';
        $contactBlockSelect.className = 'selectBtn';
        $contactBlockInput.className = 'contactsInput';
        $selectBlock.className = 'selectBlock';

        $contactBlockInput.type = 'text';
        inputMask.mask($contactBlockInput);
        $contactBlockInput.placeholder = '+7 (___) ___-__-__';

        $selectList = createSelectList($contactBlockSelect, $contactBlockInput);

        $contactBlockSelect.addEventListener('click', function(e) {
            e.preventDefault();

            $selectList.classList.toggle('active');
        })

        $selectBlock.append($contactBlockSelect);
        $selectBlock.append($selectList);
        $contactsBlock.append($selectBlock);
        $contactsBlock.append($contactBlockInput);
        $contactsBlock.append($contactsDelete);
        $contactsDiv.append($contactsBlock);
        $allContacts.append($contactsDiv);

        conacts = document.getElementsByClassName('contactsDiv');

        if (conacts.length >= 10) {
            $addContactBtn.disabled = true;
            $addContactBtn.classList.add('addContact__disabled');
        } else {
            $addContactBtn.disabled = false;
            $addContactBtn.classList.remove('addContact__disabled');
        }

        $contactsDelete.addEventListener('click', function(e) {
            e.preventDefault();

            conacts = document.getElementsByClassName('contactsDiv');

            if (conacts.length <= 9) {
                $addContactBtn.disabled = false
            } else {
                $addContactBtn.disabled = true
            }
        })

        return $allContacts;
    })

    // функция скрытия placeholder'a у инпута отчества
    $addClientLastname.addEventListener('input', function() {
        const inputLastnamePlaceholder = document.querySelector('.placeholder-text_lastname');

        // т.к. инпуты для имени и фамилии - обязательны, а для отчества - нет, то нужно сделать скрытие placeholder'а у инпута отчества
        if ($addClientLastname.value == '') {
            inputLastnamePlaceholder.style = 'display: block';
        } else {
            inputLastnamePlaceholder.style = 'display: none';
        }
    })

    // функция закрытия модального окна
    modalClose.addEventListener('click', function(e) {
      e.preventDefault();

      modalWindow.classList.remove('activeModal');
      modalOverlay.classList.remove('activeModal');
    })

    modalBack.addEventListener('click', function(e) {
      e.preventDefault();

      modalWindow.classList.remove('activeModal');
      modalOverlay.classList.remove('activeModal');
    })

    // прорисовка таблицы
    async function renderingTable() {
        // запрос на сервер для получения всех клиентов
        const response = await fetch('http://localhost:3000/api/clients');
        let clients = await response.json();

        let clientsList = document.getElementById('table__body'); // тело таблицы

        clientsList.innerHTML = ''; // обнуляем содержимое таблицы

        // сортировка таблицы
        clients = await getSortedClients(column, columnDirection);

        // добавление всех полученных клиентов в таблицу
        for (const client of clients) {
            clientsList.append(newClientTR(client))
        }
    }

    // функция фильтрации
    const searchInput = document.querySelector('.header__input'); // инпут для поиска
    searchInput.addEventListener('input', async function() {
        let clientsList = document.getElementById('table__body'); // тело таблицы
        let timer; // таймер

        clearTimeout(timer); // очистка таймера

        timer = setTimeout(async function() {
            if (searchInput.value == '') {
                renderingTable();
            } else {
                clientsList.innerHTML = '';
                // получаем query параметр search для поиска
                const params = new URL(`http://localhost:3000/api/clients?search=${searchInput.value}`);
                const searchParam = params.searchParams.get('search');
                // передаем get запрос параметра search на сервер
                const response = await fetch(`http://localhost:3000/api/clients?search=${searchParam}`, {
                    method: 'GET',
                });
                const data = await response.json();
                // из полученных данных создаем клиентов в таблице
                for (const client of data) {
                    clientsList.append(newClientTR(client));
                }
            }
        }, 300);
    })

    // сортировка таблицы
    const idSortTH = document.querySelector('.table__ID'),
          fioSortTH = document.querySelector('.table__FIO'),
          createTimeSortTH = document.querySelector('.table__date-of-creation'),
          updateTimeSortTH = document.querySelector('.table__last-changing');

    // сортировка ID
    idSortTH.addEventListener('click', function() {
        const order = document.querySelector('.table__FIO-sort');
        order.textContent = 'А-Я';

        column = this.dataset.column;
        columnDirection = !columnDirection;

        fioSortTH.classList.remove('active');
        createTimeSortTH.classList.remove('active');
        updateTimeSortTH.classList.remove('active');

        idSortTH.classList.toggle('active');

        renderingTable();
    });

    // сортировка по ФИО
    fioSortTH.addEventListener('click', function() {
        const order = document.querySelector('.table__FIO-sort');

        column = this.dataset.column;
        columnDirection = !columnDirection;

        idSortTH.classList.remove('active');
        createTimeSortTH.classList.remove('active');
        updateTimeSortTH.classList.remove('active');

        fioSortTH.classList.toggle('active');

        if (fioSortTH.classList.contains('active')) {
            order.textContent = 'Я-А';
        } else {
            order.textContent = 'А-Я';
        }

        renderingTable();
    });

    // сортировка по дате создания
    createTimeSortTH.addEventListener('click', function() {
        const order = document.querySelector('.table__FIO-sort');
        order.textContent = 'А-Я';

        column = this.dataset.column;
        columnDirection = !columnDirection;

        idSortTH.classList.remove('active');
        fioSortTH.classList.remove('active');
        updateTimeSortTH.classList.remove('active');

        createTimeSortTH.classList.toggle('active');

        renderingTable();
    });

    // сортировка по дате изменения
    updateTimeSortTH.addEventListener('click', function() {
        const order = document.querySelector('.table__FIO-sort');
        order.textContent = 'А-Я';

        column = this.dataset.column;
        columnDirection = !columnDirection;

        idSortTH.classList.remove('active');
        fioSortTH.classList.remove('active');
        createTimeSortTH.classList.remove('active');

        updateTimeSortTH.classList.toggle('active');

        renderingTable();
    });

    // функция добавления клиента в список
    modalAddClient.addEventListener('click', async function(e) {
        e.preventDefault();

        let contactsValue = getContacts(contactsDiv1);
        const form = document.querySelector('.add-form__contacts');

        // форматируем строки
        let resultSurname = String(surnameValidate($surnameInput)),
            resultName = String(nameValidate($nameInput)),
            resultLastname = String(lastnameValidate($lastnameInput));

        let name = resultName[0].toUpperCase() + resultName.substring(1),
            surname = resultSurname[0].toUpperCase() + resultSurname.substring(1),
            lastName;

        // проверка поля отчества на пустоту
        if (resultLastname === '') {
            lastName = '';
        } else {
            lastName = resultLastname[0].toUpperCase() + resultLastname.substring(1);
        }

        let resultValidator = validation(surname, name, lastName);

        if (resultValidator && resultLastname !== '') {
            let resultOfChecking = await checkingRepeats(surname, name, lastName);
            if (!resultOfChecking) {
                const response = await fetch('http://localhost:3000/api/clients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        surname: surname,
                        lastName: lastName,
                        contacts: contactsValue,
                })
              });
            } else {
                validatorError(form);
            }
        } else if (resultValidator && resultLastname === '') {
          let resultOfChecking = await checkingRepeats(surname, name);
          if (!resultOfChecking) {
                const response = await fetch('http://localhost:3000/api/clients', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      name: name,
                      surname: surname,
                      lastName: '',
                      contacts: contactsValue,
                })
              });
          } else {
              validatorError(form);
          }
        }
    })

    renderingTable();
})();

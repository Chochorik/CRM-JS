import {getDate, getTime} from './get-create-date.js';
import {getDateChange, getTimeChange} from './get-update-time.js';
import {createContactsList} from './get-client-contacts.js';
import createChangeBtn from './create-changing-btn.js';
import createDeleteBtn from './create-delete-btn.js';

export default function newClientTR(client) { // функция создания строки клиента в таблице
    // создаем строку и ячейки для каждого значения
    const $clientTR = document.createElement('tr'),
          $idTD = document.createElement('td'),
          $fioTD = document.createElement('td'),
          $dateOfCreateTD = document.createElement('td'),
          $dateOfChangeTD = document.createElement('td'),
          $contactsTD = document.createElement('td'),
          $actionsTD = document.createElement('td');

    $clientTR.className = 'clientTR';

    let clientCreateDate = document.createElement('p'),
        clientCreateTime = document.createElement('p'),
        clientCreateDateChange = document.createElement('p'),
        clientCreateTimeChange = document.createElement('p'),
        clientId = document.createElement('p'),
        clientFIO = document.createElement('p'),
        changeBtn = createChangeBtn(client),
        deleteBtn = createDeleteBtn(client),
        clientContacts = createContactsList(client);

    clientCreateDate.className = clientCreateDateChange.className = 'clientTrDate';
    clientCreateTime.className = clientCreateTimeChange.className = 'clientTrTime';
    clientId.className = 'clientID';
    clientFIO.className = 'clientFIO';

    clientCreateDate.textContent = getDate(client);
    clientCreateTime.textContent = getTime(client);
    clientCreateDateChange.textContent = getDateChange(client);
    clientCreateTimeChange.textContent = getTimeChange(client);
    clientId.textContent = client.id;
    clientFIO.textContent = client.surname + ' ' + client.name + ' ' + client.lastName;;

    // здесь наполнение каждой ячейки
    $idTD.append(clientId);
    $fioTD.append(clientFIO);
    $dateOfCreateTD.append(clientCreateDate);
    $dateOfCreateTD.append(clientCreateTime);
    $dateOfChangeTD.append(clientCreateDateChange);
    $dateOfChangeTD.append(clientCreateTimeChange);
    $contactsTD.append(clientContacts);
    $actionsTD.append(changeBtn);
    $actionsTD.append(deleteBtn);

    // вкладываем все ячейки в строку
    $clientTR.append($idTD);
    $clientTR.append($fioTD);
    $clientTR.append($dateOfCreateTD);
    $clientTR.append($dateOfChangeTD);
    $clientTR.append($contactsTD);
    $clientTR.append($actionsTD);

    // возвращаем строку клиента
    return $clientTR;
}

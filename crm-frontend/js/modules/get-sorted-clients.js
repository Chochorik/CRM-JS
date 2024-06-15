import { BASE_URL } from "../main";

export default async function getSortedClients(property, direction) { // функция сортировки клиентов
    const response = await fetch(BASE_URL + '/api/clients');
    let clients = await response.json();

    return clients.sort(function(clientA, clientsB) {
        if ((!direction == false ? clientA[property] < clientsB[property] : clientA[property] > clientsB[property]))
        return -1;
    })
}

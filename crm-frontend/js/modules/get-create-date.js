export function getDate(client) { // функция определния даты
    let date = new Date(client.createdAt);

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
}

export function getTime(client) { // функция определения времени
    let time = new Date(client.createdAt);

    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (minutes <= 9) {
        return hours + ':' + '0' + minutes;
    } else {
        return hours + ':' + minutes;
    }
}

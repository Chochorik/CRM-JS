export function getDateChange(client) { // функция определения даты изменения
    let date = new Date(client.updatedAt);

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
}

export function getTimeChange(client) { // функция определения времени изменения
    let time = new Date(client.updatedAt);

    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (minutes <= 9) {
        return hours + ':' + '0' + minutes;
    } else {
        return hours + ':' + minutes;
    }
}

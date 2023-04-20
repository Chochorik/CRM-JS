export default function getContacts(div) { // функция получения массива контактов
    let contactsArr = [];

    let contactsDiv = document.getElementsByClassName(div);

    for (const contact of contactsDiv) {
        let contactSelect = contact.querySelector('.selectBtn').value,
            contactInput = contact.querySelector('.contactsInput').value;

        contactsArr.push({type: contactSelect, value: contactInput})
    }

    return contactsArr;
}

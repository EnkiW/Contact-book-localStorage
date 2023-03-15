const contactForm = document.getElementById('contactForm');
const contactTable = document.getElementById('contactTable');

function addContact(name, phone) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const id = Date.now();
    contacts.push({id, name, phone});
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function deleteContact(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let rows = '';
    contacts.forEach(contact => {
        rows += `
      <tr>
       <td>${contact.id}</td>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td><button data-id="${contact.id}" class="deleteBtn">Видалити</button></td>
      </tr> `;
    });
    contactTable.querySelector('tbody').innerHTML = rows;
}

contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = contactForm.querySelector('#name').value;
    const phone = contactForm.querySelector('#phone').value;
    addContact(name, phone);
    renderContacts();
    contactForm.reset();
});

contactTable.addEventListener('click', event => {
    if (event.target.classList.contains('deleteBtn')) {
        const id = Number(event.target.getAttribute('data-id'));
        deleteContact(id);
        renderContacts();
    }
});
renderContacts();
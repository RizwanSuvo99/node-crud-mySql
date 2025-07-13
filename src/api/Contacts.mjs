class Contacts {
  constructor() {
    this.contacts = [
      {
        id: 1,
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        phone: '+1 (555) 987-6543',
        email: 'jane.smith@example.com',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        phone: '+1 (555) 456-7890',
        email: 'mike.johnson@example.com',
      },
    ];
  }

  getAllContacts() {
    return this.contacts;
  }

  getContactById(id) {
    return this.contacts.find((contact) => contact.id === id);
  }

  createContact(contact) {
    contact.id = this.contacts.length + 1;
    this.contacts.push(contact);
    return contact;
  }

  updateContactById(id, updatedContact) {
    let index = this.contacts.findIndex((contact) => contact.id === id);

    this.contacts[index].name =
      updatedContact.name || this.contacts[index].name;
    this.contacts[index].phone =
      updatedContact.phone || this.contacts[index].phone;
    this.contacts[index].email =
      updatedContact.email || this.contacts[index].email;

    return this.contacts[index];
  }

  deleteContactById(id) {
    const deletedObj = this.contacts.find((contact) => contact.id === id);
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    return deletedObj;
  }
}

const contacts = new Contacts();

export default contacts;

import contacts from './Contacts.mjs';

export const getAllContacts = (req, res) => {
  res.send(contacts.getAllContacts());
};

export const createContact = (req, res) => {
  const { name, phone, email } = req.body;
  let contact = contacts.createContact({
    name,
    phone,
    email,
  });
  res.json(contact);
};

export const getContactById = (req, res) => {
  const contact = contacts.getContactById(parseInt(req.params.id));
  res.json(contact);
};

export const updateContactById = (req, res) => {
  const updatedContact = contacts.updateContactById(
    parseInt(req.params.id),
    req.body
  );
  res.json(updatedContact);
};

export const deleteContactById = (req, res) => {
  const deletedContact = contacts.deleteContactById(parseInt(req.params.id));
  res.json(deletedContact);
};

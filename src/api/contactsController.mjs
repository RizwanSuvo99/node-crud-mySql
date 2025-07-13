import contacts from './Contacts.mjs';

export const getAllContacts = async (req, res) => {
  try {
    const allContacts = await contacts.getAllContacts();
    res.json(allContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await contacts.getContactById(parseInt(req.params.id));
    res.json(contact);
  } catch (error) {
    console.error('Error fetching Single Contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    let contact = await contacts.createContact({
      name,
      phone,
      email,
    });
    res.json(contact);
  } catch (error) {
    console.error('Error Creating Single Contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateContactById = async (req, res) => {
  try {
    const updatedContact = await contacts.updateContactById(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedContact);
  } catch (error) {
    console.error('Error Updating Single Contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteContactById = async (req, res) => {
  try {
    const deletedContact = await contacts.deleteContactById(
      parseInt(req.params.id)
    );
    res.json(deletedContact);
  } catch (error) {
    console.error('Error Deleting Single Contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

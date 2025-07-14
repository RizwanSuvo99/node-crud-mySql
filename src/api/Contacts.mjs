import db from './db.js';

class Contacts {
  constructor() {
    this.collection = db.collection('contacts');
  }

  // Get all contacts
  async getAllContacts() {
    return await this.collection.find({}).toArray();
  }

  // Get a single contact by numeric ID
  async getContactById(id) {
    try {
      return await this.collection.findOne({ _id: id });
    } catch (err) {
      console.error('Error finding contact with ID:', id, err);
      return null;
    }
  }

  // Create a new contact with incremented numeric ID
  async createContact(contact) {
    const { name, phone, email } = contact;

    const latest = await this.collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const nextId = latest.length === 0 ? 1 : latest[0]._id + 1;

    const newContact = {
      _id: nextId,
      name,
      phone,
      email,
    };

    await this.collection.insertOne(newContact);
    return newContact;
  }

  // Update a contact by numeric ID
  async updateContactById(id, updatedContact) {
    try {
      const result = await this.collection.findOneAndUpdate(
        { _id: id },
        { $set: updatedContact },
        { returnDocument: 'after' }
      );

      return updatedContact;
    } catch (err) {
      console.error('Update failed for ID:', id, err);
      return null;
    }
  }

  // Delete a contact by numeric ID
  async deleteContactById(id) {
    try {
      const result = await this.collection.findOneAndDelete({ _id: id });
      if (!result.value) {
        console.log(`No contact found with ID ${id}`);
        return null;
      }
      return result.value;
    } catch (err) {
      console.error('Delete failed for ID:', id, err);
      return null;
    }
  }
}

const contacts = new Contacts();
export default contacts;

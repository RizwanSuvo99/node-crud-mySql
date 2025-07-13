import pool from './db.js';
class Contacts {
  async getAllContacts() {
    const [rows] = await pool.query('SELECT * FROM contacts');
    return rows;
  }

  async getContactById(id) {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [
      id,
    ]);
    return rows[0];
  }

  async createContact(contact) {
    const { name, phone, email } = contact;
    const [result] = await pool.query(
      'INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)',
      [name, phone, email]
    );
    return contact;
  }

  async updateContactById(id, updatedContact) {
    const contact = await this.getContactById(id);
    if (!contact) return null;

    const { name, phone, email } = {
      ...contact,
      ...updatedContact,
    };

    await pool.query(
      'UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?',
      [name, phone, email, id]
    );

    return { id, name, phone, email };
  }

  async deleteContactById(id) {
    const contact = await this.getContactById(id);
    if (!contact) return null;

    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    return contact;
  }
}

const contacts = new Contacts();

export default contacts;

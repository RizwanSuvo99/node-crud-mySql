import axios from 'axios';
import API_CONFIG from '../config/api.js';

class ContactService {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.endpoints = API_CONFIG.endpoints;
    this.axiosInstance = axios.create({ baseURL: this.baseURL });
  }

  async getAllContacts() {
    const res = await this.axiosInstance.get(this.endpoints.contacts);
    return res.data;
  }

  async getContact(id) {
    const res = await this.axiosInstance.get(this.endpoints.contact(id));
    return res.data;
  }

  async createContact(contactData) {
    const res = await this.axiosInstance.post(
      this.endpoints.contacts,
      contactData
    );
    return res.data;
  }

  async updateContact(id, contactData) {
    const res = await this.axiosInstance.put(
      this.endpoints.contact(id),
      contactData
    );
    return res.data;
  }

  async deleteContact(id) {
    const res = await this.axiosInstance.delete(this.endpoints.contact(id));
    return res.data;
  }
}

export default new ContactService();

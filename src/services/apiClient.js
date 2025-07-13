import axios from 'axios';
import API_CONFIG from '../config/api.js';

const axiosInstance = axios.create({ baseURL: API_CONFIG.baseURL });

export const getAllContacts = async () => {
  const res = await axiosInstance.get(API_CONFIG.endpoints.contacts);
  return res.data;
};

export const getContact = async (id) => {
  const res = await axiosInstance.get(API_CONFIG.endpoints.contact(id));
  return res.data;
};

export const createContact = async (contactData) => {
  const res = await axiosInstance.post(
    API_CONFIG.endpoints.contacts,
    contactData
  );
  return res.data;
};

export const updateContact = async (id, contactData) => {
  const res = await axiosInstance.put(
    API_CONFIG.endpoints.contact(id),
    contactData
  );
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await axiosInstance.delete(API_CONFIG.endpoints.contact(id));
  return res.data;
};

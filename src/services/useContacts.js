import { useCallback } from 'react';
import API_CONFIG from '../config/api.js';

const baseURL = API_CONFIG.baseURL;
const endpoints = API_CONFIG.endpoints;

export const getAllContacts = async () => {
  const res = await fetch(`${baseURL}${endpoints.contacts}`);
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return await res.json();
};

export const getContact = async (id) => {
  const res = await fetch(`${baseURL}${endpoints.contact(id)}`);
  if (!res.ok) throw new Error('Failed to fetch contact');
  return await res.json();
};

export const createContact = async (contactData) => {
  const res = await fetch(`${baseURL}${endpoints.contacts}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return await res.json();
};

export const updateContact = async (id, contactData) => {
  const res = await fetch(`${baseURL}${endpoints.contact(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!res.ok) throw new Error('Failed to update contact');
  return await res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${baseURL}${endpoints.contact(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return await res.json();
};

// Optional React hook for contacts CRUD
export function useContactsApi() {
  return {
    getAllContacts: useCallback(getAllContacts, []),
    getContact: useCallback(getContact, []),
    createContact: useCallback(createContact, []),
    updateContact: useCallback(updateContact, []),
    deleteContact: useCallback(deleteContact, []),
  };
}

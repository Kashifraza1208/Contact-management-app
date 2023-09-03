import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "./actionTypes";

// Define the contact interface
interface Contact {
  id: number;
  name: string;
  email: string;
}

// Define action types
export const addContact = (contact: Contact) => ({
  type: ADD_CONTACT as typeof ADD_CONTACT, // Type assertion to maintain type safety
  payload: contact,
});

export const editContact = (contact: Contact) => ({
  type: EDIT_CONTACT as typeof EDIT_CONTACT, // Type assertion to maintain type safety
  payload: contact,
});

export const deleteContact = (contactId: number) => ({
  type: DELETE_CONTACT as typeof DELETE_CONTACT, // Type assertion to maintain type safety
  payload: contactId,
});

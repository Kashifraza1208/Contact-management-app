import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "./actionTypes";
import { Contact } from "./actionTypes";
const initialState = {
  contacts: [] as Contact[],
};

export interface ContactsState {
  contacts: Contact[];
  // Other properties if needed
}

function contactsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_CONTACT:
      // Handle adding a contact
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case EDIT_CONTACT:
      // Handle editing a contact
      // Update the contact in the state based on action.payload
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case DELETE_CONTACT:
      // Handle deleting a contact
      // Remove the contact from the state based on action.payload
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    // Handle other action types as needed
    default:
      return state;
  }
}

export default contactsReducer;

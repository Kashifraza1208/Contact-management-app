// actionTypes.ts
// actionTypes.ts
export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  status: string;
}


export const ADD_CONTACT = "ADD_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
// Add other action types as needed

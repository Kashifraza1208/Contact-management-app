import React, { useState } from "react";
import "./Contacts.css";
import ContactsForm from "./ContactsForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  editContact,
} from "../../components/redux/contactsActions";
import { RootState } from "../../store"; // Import RootState to type useSelector
import { Contact } from "../../components/redux/actionTypes";
 // Check the path to actionTypes.ts

const Contacts: React.FC = () => {
  const contacts: Contact[] = useSelector(
    (state: RootState) => state.contacts.contacts
  );

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1); // Set type as number

  const handleAddContact = (newContact: any) => {
    setShowForm(false);
    setEditIndex(-1);
  };

  const handleEditContact = (editedContact: any) => {
    dispatch(editContact(editedContact));
    setShowForm(false);
    setEditIndex(-1);
  };

  const handleDeleteContact = (contactId: number) => {
    dispatch(deleteContact(contactId));
    setShowForm(false);
    setEditIndex(-1);
  };

  return (
    <div className="contact-buttons">
      <div className="navbar">
        <h2 className="contact-heading">Contacts Page</h2>
      </div>
      <div className="contactContainer">
        {showForm ? (
          <ContactsForm
            onAddContact={handleAddContact}
            onEditContact={handleEditContact}
            editedContact={editIndex !== -1 ? contacts[editIndex] : null}
          />
        ) : (
          <div>
            {contacts.length === 0 ? (
              <p className="paragraph">
                No contacts found. Please add contacts from the "Create Contact"
                button.
              </p>
            ) : (
              <div>
                {showForm ? (
                  <h2 className="list-heading">All Contacts</h2>
                ) : null}
                <div className="big-column">
                  <h2 className="list-heading">All Contacts</h2>
                  <div className="table-container">
                    <table className="contact-table">
                      <thead>
                        <tr>
                          <th>Firstname</th>
                          <th>Lastname</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact, index) => (
                          <tr key={index}>
                            <td>{contact.firstname}</td>
                            <td>{contact.lastname}</td>
                            <td>{contact.status}</td>
                            <td>
                              <button
                                className="buttonedit"
                                onClick={() => {
                                  setShowForm(true);
                                  setEditIndex(index);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="buttondelete"
                                onClick={() => handleDeleteContact(index)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="buttons-container">
        {!showForm && (
          <button className="button" onClick={() => setShowForm(!showForm)}>
            Create Contact
          </button>
        )}
      </div>
      {showForm ? null : <Sidebar />}
    </div>
  );
};

export default Contacts;

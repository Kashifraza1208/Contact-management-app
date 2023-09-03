import React, { useState, useEffect } from "react";
import "./ContactsForm.css";
import { useDispatch } from "react-redux";
import {
  addContact,
  editContact,
} from "../../components/redux/contactsActions";

interface ContactsFormProps {
  onAddContact: (newContact: any) => void;
  onEditContact: (editedContact: any) => void;
  editedContact: any;
}

const ContactsForm: React.FC<ContactsFormProps> = ({
  onAddContact,
  onEditContact,
  editedContact,
}) => {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (editedContact) {
      setFirstname(editedContact.firstname);
      setLastname(editedContact.lastname);
      setStatus(editedContact.status);
    }
  }, [editedContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      id: 0, // You can set this to the appropriate default or empty value
      name: "", // You can set this to the appropriate default or empty value
      email: "", // You can set this to the appropriate default or empty value
      firstname,
      lastname,
      status,
    };

    if (editedContact) {
      onEditContact(newContact);
      dispatch(editContact(newContact));
    } else {
      onAddContact(newContact);
      dispatch(addContact(newContact));
    }

    setFirstname("");
    setLastname("");
    setStatus("active");
  };

  return (
    <div className="contacts-form">
      <h2>{editedContact ? "Edit Contact" : "Add Contacts"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">
          {editedContact ? "Save Changes" : "Add Contacts"}
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;

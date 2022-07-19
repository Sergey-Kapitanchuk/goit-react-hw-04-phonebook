import React from "react";
import propTypes from 'prop-types';
import CSS from "./ContactList.module.css"

export const ContactList = ({contacts, onDeleteContact}) => { 
    return (
        <ul className={CSS.contact}>
          {contacts.map(contact =>
              <li key={contact.id} className={CSS.contactList}><p>{contact.name}: {contact.number}</p>
                  <button type="button" onClick={() => onDeleteContact(contact.id)} className={CSS.contactButton}>Delete</button>
              </li>
          )}
        </ul>
    )
};

ContactList.propTypes = {
    contacts: propTypes.arrayOf(propTypes.object),
    onDeleteContact: propTypes.func.isRequired,
};
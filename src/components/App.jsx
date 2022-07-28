import { useState, useEffect } from "react";
import { nanoid } from 'nanoid/non-secure'
import { Form } from "./Form/Form";
import Filter from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import toast, { Toaster } from 'react-hot-toast';




export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');



  const formSubmit = (name, number) => {
    const id = nanoid();
    const contact = {
      id,
      name,
      number
    };
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      toast.error(`${name} is already in contacts!`);
      return;
    }
    setContacts(prevState => ([contact, ...prevState]))

  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFil = filter.toLocaleLowerCase()
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFil))
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    )
  };

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);


  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmit} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
    </div>
  )
};


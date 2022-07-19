import React, { Component } from "react";
import { nanoid } from 'nanoid/non-secure'
import { Form } from "./Form/Form";
import Filter from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import toast, { Toaster } from 'react-hot-toast';




export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  // alert = useAlert();


  formSubmit = (name, number) => {
    const id = nanoid();
    const contact = {
      id,
      name,
      number
    };
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      toast.error(`${name} is already in contacts!`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }))
    console.log([this.state.contacts])
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFil = this.state.filter.toLocaleLowerCase()
    return this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFil))
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));

    };
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }

  };

  render() {

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmit} />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    )
  };
};


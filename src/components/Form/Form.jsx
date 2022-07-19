import React, { Component } from "react";
import { nanoid } from 'nanoid';
import CSS from "./Form.module.css"

export class Form extends Component{
    state = {
        name: '',
        number: ''
    }
    contactId = nanoid();

  nameInputChange = e => { 
    const { name, number, value } = e.currentTarget;
    this.setState({ [name]: value, [number]: value });
    };

  contactSubmit = e => { 
      e.preventDefault();
      const {name, number} = this.state
      this.props.onSubmit(name, number);

      this.reset();
    };
    
    reset = () => {
        this.setState({ name: '', number: ''});
    }

  render() {
    return (
      <>
        <form onSubmit={this.contactSubmit} className={CSS.form}>
            <label htmlFor={this.contactId} className={CSS.formInput}>
            Name
            <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                value={this.state.name}
                        onChange={this.nameInputChange}
                        id={this.contactId}
                required
            />
            </label>
                
            <label htmlFor="this.contactId"className={CSS.formInput}>
                Number
                <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                value={this.state.number}
                        onChange={this.nameInputChange}
                        id={this.contactId}
                required
                />
            </label>

          <button type="submit" className={ CSS.buttonForm}>Add contact</button>
                

        </form>
      </>
    )
  };
};

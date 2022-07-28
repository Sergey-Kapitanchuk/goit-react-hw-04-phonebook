import { useState } from "react";
import { nanoid } from 'nanoid';
import CSS from "./Form.module.css"

export function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactId = nanoid();

  const nameInputChange = e => {
    const { value, name } = e.currentTarget;
    name === 'name'
      ? setName(value)
      : setNumber(value);
  };

  const contactSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);

    setName('');
    setNumber('');
  };


  return (
    <>
      <form onSubmit={contactSubmit} className={CSS.form}>
        <label htmlFor={contactId} className={CSS.formInput}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={nameInputChange}
            id={contactId}
            required
          />
        </label>

        <label htmlFor="contactId" className={CSS.formInput}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={nameInputChange}
            id={contactId}
            required
          />
        </label>

        <button type="submit" className={CSS.buttonForm}>Add contact</button>


      </form>
    </>
  )
};

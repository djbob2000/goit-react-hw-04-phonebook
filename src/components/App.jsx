import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = ({ name, number }) => {
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts.`)
      : setContacts([{ id: nanoid(), name: name.trim(), number }, ...contacts]);
  };
  // setContacts(prev => [...prev, newContact]);

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  };

  const filteredContactsHandler = () => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const changeFilterValue = event => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div className={css.container}>
        <h2>Phonebook</h2>
        <ContactForm
          onSubmit={addContactHandler}
          contacts={contacts}
        ></ContactForm>
        <Filter value={filter} onChange={changeFilterValue} />
        <h2>Contacts:</h2>
        <ContactList
          contacts={filteredContactsHandler()}
          onDelete={deleteContact}
        />
      </div>
    </>
  );
};

export default App;

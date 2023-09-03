import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operation';
import { FormContact, Input, Button } from './ContacForm.styled';
import { getContacts } from 'redux/selectors';

export default function ContactForm() {
  const nameId = nanoid();
  const numberId = nanoid();
  const { items } = useSelector(getContacts);
  const dispatch = useDispatch();
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { name, number } = contact;

    if (items.some(contact => contact.name === name)) {
      alert('Oh! This contact has already been saved');
      setContact({ name: '', number: '' });
      return;
    }
    dispatch(addContact({ name, number }));
    setContact({ name: '', number: '' });
  };

  return (
    <FormContact autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <Input
        id={nameId}
        type="text"
        name="name"
        value={contact.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor={numberId}>Number</label>
      <Input
        id={numberId}
        type="tel"
        name="number"
        value={contact.number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <Button type="submit">Add contact</Button>
    </FormContact>
  );
}

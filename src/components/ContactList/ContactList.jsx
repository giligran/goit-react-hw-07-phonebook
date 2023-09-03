import ContactListItem from 'components/ContactLstItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import { getContacts, getFilter } from 'redux/selectors';

function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contacts.items.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => {
        return <ContactListItem key={id} id={id} name={name} number={number} />;
      })}
    </ul>
  );
}

export default ContactList;

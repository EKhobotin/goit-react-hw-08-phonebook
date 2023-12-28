import React, { useEffect } from 'react';
// import { nanoid } from 'nanoid';
import { Audio } from 'react-loader-spinner';
import { List, ListItem, Span } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk, fetchContactsThunk } from 'store/contactsThunk';
import {
  selectContacts,
  selectFilter,
  selectError,
  selectisLoading,
} from 'store/selectors';
import { selectUser } from 'store/auth/selectors';

export const ContactsList = () => {
  const dispatch = useDispatch();
  function handleDelete(id) {
    dispatch(deleteContactThunk(id));
  }

  // const { items, error, isLoading } = useSelector(selectContacts);
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectisLoading);
  const { filter } = useSelector(selectFilter);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchContactsThunk());
    }
  }, [dispatch, user]);

  function filteredContacts() {
    // console.log(contacts);
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  return (
    <List>
      {error && <p>{error}</p>}
      {isLoading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
      {filteredContacts().map(el => (
        <ListItem key={el.id}>
          {el.name}: <Span>{el.phone}</Span>
          <button type="button" onClick={() => handleDelete(el.id)}>
            X
          </button>
        </ListItem>
      ))}
    </List>
  );
};

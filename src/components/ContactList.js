import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import Contact from "./Contact"
import { nanoid } from 'nanoid';
import ContactDetailsModal from './modals/ContactDetailsModal';
import InfiniteScroll from 'react-infinite-scroll-component';


function ContactList(props) {

  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedContact, setSelectedContact] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { contacts, refetch } = props;
  const [isNotEdit, setIsNotEdit] = useState(true);
  const chunkSize = 5;

  useEffect(() => {
    const newDisplayedContacts = contacts.slice(startIndex, startIndex + chunkSize);
    setDisplayedContacts(newDisplayedContacts);
  }, [startIndex, contacts]);


  const handleContactClick = (contact) => {
    setSelectedContact(contact.id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedContact(null);
    setShowModal(false);
    setIsNotEdit(true);
    refetch();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={contacts.length}
        next={() => setStartIndex(startIndex + chunkSize)}
        hasMore={startIndex + chunkSize < contacts.length}
        loader={<h4>Loading...</h4>}
        endMessage={"That's all folks!"}

      >
        <ListGroup >
          {contacts.map((contact) => (
            <Contact
              key={nanoid()}
              contact={contact}
              onClick={() => handleContactClick(contact)}
            />
          ))}
        </ListGroup>
      </InfiniteScroll>
      <ContactDetailsModal id={selectedContact} showModal={showModal}
        handleModalClose={handleModalClose} isNotEdit={isNotEdit} setIsNotEdit={setIsNotEdit}
      />
    </>
  );
};

export default ContactList;
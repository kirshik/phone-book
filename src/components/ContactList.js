import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import Contact from "./Contact"
import { nanoid } from 'nanoid';
import ContactDetailsModal from './modals/ContactDetailsModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollDetector from './ScrollDetector';


function ContactList(props) {

  const [selectedContact, setSelectedContact] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { contacts, refetch, offset, setOffset } = props;
  const [isNotEdit, setIsNotEdit] = useState(true);

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

  const handleScrollUp = () => {
    offset >= 5 ? setOffset(offset - 5) : setOffset(0);
  }

  const handleScrollDown = () => {
    setOffset(offset + 5);
  }

  return (
    <>
      <ScrollDetector handleScrollUp={handleScrollUp} handleScrollDown={handleScrollDown} />
      <ListGroup >
        {contacts.map((contact) => (
          <Contact
            key={nanoid()}
            contact={contact}
            onClick={() => handleContactClick(contact)}
          />
        ))}
      </ListGroup>
      <ContactDetailsModal id={selectedContact} showModal={showModal}
        handleModalClose={handleModalClose} isNotEdit={isNotEdit} setIsNotEdit={setIsNotEdit}
      />
    </>
  );
};

export default ContactList;
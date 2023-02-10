import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import swal from 'sweetalert';
import { GET_CONTACT } from "../../gql/gqlQueries";
import PhoneNumbersList from "../PhoneNumbersList";
import { REMOVE_CONTACT, UPDATE_CONTACT } from "../../gql/gqlMutations";
import PhotoFilter from "../PhotoFilter";

function ContactDetailsModal(props) {

  const [photoFilter, setPhotoFilter] = useState('original');
  const [contact, setContact] = useState(null);
  const [contactEditData, setContactEditData] = useState(null);

  const [numbers, setNumbers] = useState([]);

  const id = Number(props.id);
  const isNotEdit = props.isNotEdit;

  const { error, data, refetch } = useQuery(GET_CONTACT(id));
  const [removeContact] = useMutation(REMOVE_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);



  useEffect(() => {
    if (data) {
      const { __typename, ...rest } = data.getOneContact;
      setContact(rest);
      setContactEditData({ id, ...rest });
      setNumbers(rest.phoneNumbers.map((number, index) => ({ id: index + 1, number })));
      setPhotoFilter(rest.filter);
    }
    if (error) {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  }, [data]);

  useEffect(() => {
    const changedNumbers = numbers.map((number) => number.number);
    setContactEditData({ ...contactEditData, phoneNumbers: changedNumbers });
  }, [numbers]);

  useEffect(() => {
    setContactEditData({ ...contactEditData, filter: photoFilter });
  }, [photoFilter]);

  const handleFilterClick = (filter) => {
    setPhotoFilter(filter);
  };

  function deleteContact() {
    removeContact({ variables: { id } }).catch((err) => {
      swal("Something went wrong!!!!!", {
        icon: "error",
      });
    }).then(() => {
      swal("Contact removed successfully", {
        icon: "success",
      });
    });
  }

  function handleDelete() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteContact();
          props.handleModalClose();
        } else {
          swal("Your contact is safe!");
        }
      });

  }
  const onContactEdit = () => { props.setIsNotEdit(false) }

  const onContactSave = () => {
    updateContact({ variables: { contact: contactEditData } }).then((res) => {
      swal("Contact updated successfully", {
        icon: "success",
      });
      props.setIsNotEdit(true);
      refetch();
    }).catch((err) => {
      swal("Something went wrong!", {
        icon: "error",
      });
    });
  }

  const handleEditFieldChange = (e) => {
    setContactEditData({ ...contactEditData, [e.target.id]: e.target.value })
  }

  const handleEmptyField = (value) => {
    return value ? value : 'Empty';
  }


  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        {contact && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{contact.nickname || `${contact.firstName} ${contact.lastName}`}</Modal.Title>
            </Modal.Header>
            <div className="modal-body justify-content-around d-flex">
              <div className="row">
                <div className="col-5 text-center">
                  <img
                    src={contact.photo}
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className={`img img-thumbnail modal-img ${photoFilter}`}
                  />
                  <PhotoFilter handleFilterClick={handleFilterClick} show={isNotEdit} filter={photoFilter} />
                </div>
                <div className="col-7 align-self-center ">
                  <form className="form">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name:</label>
                      <input type="text" className="form-control" onChange={handleEditFieldChange}
                        id="firstName" value={handleEmptyField(contactEditData.firstName)} disabled={isNotEdit} />
                      <label htmlFor="lastName">Last Name:</label>
                      <input type="text" className="form-control" onChange={handleEditFieldChange}
                        id="lastName" value={handleEmptyField(contactEditData.lastName)} disabled={isNotEdit} />
                      <label htmlFor="nickname">Nickname:</label>
                      <input type="text" className="form-control" onChange={handleEditFieldChange}
                        id="nickname" value={handleEmptyField(contactEditData.nickname)} disabled={isNotEdit} />
                      <label htmlFor="phoneNumbers">Phone Numbers:</label>
                      <PhoneNumbersList numbers={numbers} setNumbers={setNumbers} id="phoneNumbers" isNotEdit={isNotEdit} />
                      <label htmlFor="address">Address:</label>
                      <input type="text" className="form-control" onChange={handleEditFieldChange}
                        id="address" value={handleEmptyField(contactEditData.address)} disabled={isNotEdit} />

                    </div>
                    <div className="mt-2" >
                      <button type="button" className="btn  btn-outline-success me-2" onClick={onContactSave} hidden={isNotEdit}>
                        Save
                      </button>
                      <button type="button" className="btn  btn-outline-dark" onClick={() => { props.setIsNotEdit(true) }} hidden={isNotEdit}>
                        Cancel
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
            <Modal.Footer>
              <button className="btn btn-outline-dark" onClick={props.handleModalClose}>
                Close
              </button>
              <button className="btn  btn-outline-dark" onClick={onContactEdit} hidden={!isNotEdit}>
                Edit
              </button>
              <button className="btn btn-outline-danger" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
export default ContactDetailsModal;
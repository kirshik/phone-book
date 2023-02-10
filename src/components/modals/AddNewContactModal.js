import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../../gql/gqlMutations";
import swal from "sweetalert";
import { useState } from "react";
import PhoneNumbersList from "../PhoneNumbersList";
import ImageUpload from "../ImageUploadComponent";
import PhotoFilter from "../PhotoFilter";


function AddNewContactModal(props) {

  const [createContact] = useMutation(ADD_CONTACT);
  const [contact, setContact] = useState({});
  const [numbers, setNumbers] = useState([]);
  const [image, setImage] = useState(null);
  const [filter, setFilter] = useState('original');

  const handleModalClose = () => {
    setImage(null);
    props.handleModalClose();
  }

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.id]: e.target.value })
  }

  const handleFilterClick = (filter) => {
    setFilter(filter);
  }

  const handleAddNewContact = (e) => {
    e.preventDefault();
    const changedNumbers = numbers.map((number) => number.number);
    if (changedNumbers.length > 0) {
      const photo = image ? image : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
      // const photo = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
      createContact({ variables: { contact: { ...contact, phoneNumbers: changedNumbers, photo, filter } } }).catch((err) => {
        swal("Something went wrong!!!!!", {
          icon: "error",

        });
      }).then(() => {
        swal("Contact added successfully", { icon: "success" });
      });
      handleModalClose();
    } else {
      swal("Please add at least one phone number", {
        icon: "error",
      });
    }

  }

  return (<>
    <Modal
      show={props.show}
      onHide={handleModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <div className="row" >
              <div className="col-6">
                <ImageUpload image={image} setImage={setImage} filter={filter} />
                <PhotoFilter handleFilterClick={handleFilterClick} filter={filter} />
              </div>
              <div className="col-6">
                <label htmlFor="firstName">First Name<span className="text-danger">*</span></label>
                <input type="text" onChange={handleChange} className="form-control" id="firstName" required />
                <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                <input type="text" onChange={handleChange} className="form-control" id="lastName" required />
                <label htmlFor="phoneNumbers">Phone Numbers<span className="text-danger">*</span></label>
                <PhoneNumbersList numbers={numbers} setNumbers={setNumbers} id="phoneNumbers" />
                <label htmlFor="nickname">Nickname</label>
                <input type="text" onChange={handleChange} className="form-control" id="nickname" />
                <label htmlFor="address">Address</label>
                <input type="text" onChange={handleChange} className="form-control" id="address" />
              </div>
            </div>

          </div>
          <button type="submit" onClick={handleAddNewContact} className="btn btn-outline-dark m-2 ms-0">Add new contact</button>
        </form>
      </Modal.Body>
    </Modal>
  </>);
}
export default AddNewContactModal;
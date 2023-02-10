import { useState } from "react";
import { ListGroupItem } from "react-bootstrap";

function Contact(props) {
  const [spinner, setSpinner] = useState(true);
  const contact = props.contact;

  // temp solution
  setTimeout(() => { if (!spinner) setSpinner(false) }, 1);

  const onLoad = () => { setSpinner(true) };
  return (
    <ListGroupItem onClick={props.onClick} style={{ cursor: "pointer" }}>
      <div className="row align-items-center">
        <div className="col-2" >
          <img className={`img img-thumbnail contact-img ${contact.filter}`} src={contact.photo} onLoad={onLoad} />
          <div className="d-flex justify-content-center" >
            <div className="spinner-border" role="status" hidden={spinner}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div >
        <div className="col-10">
          <h5>
            {contact.nickname
              ? contact.nickname
              : `${contact.firstName} ${contact.lastName} `}
          </h5>
          <p>Phone Number: {contact.phoneNumbers[0]}</p>
        </div >
      </div >
    </ListGroupItem>
  );
}
export default Contact;
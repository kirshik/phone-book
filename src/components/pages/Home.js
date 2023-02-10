import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import swal from "sweetalert";

import { GET_ALL_CONTACTS, SEARCH_CONTACT } from "../../gql/gqlQueries";

import AddNewContactModal from "../modals/AddNewContactModal";
import ContactList from "../ContactList";


function Home() {
  const [search, setSearch] = useState('');
  const [showAddNewContactModal, setShowAddNewContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [offset, setOffset] = useState(0);

  const { data: allContactsData, error: allContactsError, refetch: allContactsRefetch } = useQuery(GET_ALL_CONTACTS(offset));
  const { data: searchContactsData, error: searchContactsError, refetch: searchContactsRefetch } = useQuery(SEARCH_CONTACT(search));

  //  update ContactList after closing the modal
  useEffect(() => {
    if (allContactsData) {
      setContacts(allContactsData.getContacts);
    }
  }, [allContactsData]);

  // set contacts after searching
  useEffect(() => {
    if (searchContactsData) {
      setContacts(searchContactsData.searchContacts);
    }
    if (allContactsError || searchContactsError) {
      swal("Something went wrong", { icon: "error" })
    }
  }, [searchContactsData]);


  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setIsSearch(true);
    }
    setSearch(e.target.value);
  }

  const handleModalClose = () => {
    if (isSearch) {
      searchContactsRefetch();
    } else {
      allContactsRefetch();
    }
    setShowAddNewContactModal(false);
  }

  //search bar
  const searchComponent = (
    <div className="m-4 ">
      <div className="row">
        <form className="d-flex me-3 ms-3" role="search">
          <input className="form-control form-control-lg me-2 "
            type="search" placeholder="Search" aria-label="Search"
            onChange={handleChange} />
        </form>
      </div>
      <div className="row  ms-2 me-2">
        <button className="btn btn-dark m-2 mb-1" type="submit" onClick={() => { setShowAddNewContactModal(true) }}>Add New Contact</button>
      </div>
    </div>


  )

  return (
    <><AddNewContactModal show={showAddNewContactModal} handleModalClose={handleModalClose} />
      <div className="container mb-5">
        {searchComponent}
        <div className="container">
          <ContactList contacts={contacts} offset={offset}
            refetch={isSearch ? searchContactsRefetch : allContactsRefetch} setOffset={setOffset} />
        </div>

      </div>

    </>
  );
}
export default Home;
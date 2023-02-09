import { gql } from '@apollo/client';
const GET_CONTACT = (value) => {
  return gql`
  query{
    getOneContact(id:${value}){
      nickname
      firstName
      lastName
      photo
      phoneNumbers
      address
      filter
    }
  }
  `;
}

const SEARCH_CONTACT = (value) => {
  return gql`
  query{
    searchContacts(searchQuery : "${value}"){
      id
      firstName
      lastName
      nickname
      photo
      phoneNumbers
      filter
    }
  }
  `;
}

const GET_ALL_CONTACTS = gql`
  query{
    getContacts{
      id
      nickname
      firstName
      lastName
      photo
      phoneNumbers
      filter
    }
  }
  `;
export { GET_CONTACT, SEARCH_CONTACT, GET_ALL_CONTACTS } 
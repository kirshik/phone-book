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

const SEARCH_CONTACT = (value, offset = 0, chunkSize = 5) => {
  return gql`
  query{
    searchContacts(searchQuery : "${value}", offset: ${offset}, chunkSize: ${chunkSize}){
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

const GET_ALL_CONTACTS = (offset, chunkSize = 5) => {
  return gql`
  query{
    getContacts(offset: ${offset}, chunkSize: ${chunkSize}){
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
}
export { GET_CONTACT, SEARCH_CONTACT, GET_ALL_CONTACTS } 
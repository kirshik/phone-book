import { gql } from '@apollo/client';
const REMOVE_CONTACT = gql`
  mutation removeContact($id: Float!) {
    removeContact(id:$id)
  }
  `;

const ADD_CONTACT = gql`
  mutation createContact($contact:CreateContactInput!){
  createContact(createContact: $contact){
    id
    firstName
    lastName
    nickname
    address
    photo
    phoneNumbers
  }
}
`
const UPDATE_CONTACT = gql`
  mutation updateContact($contact : UpdateContactInput!){
    updateContact(updateContact: $contact){
      id
      firstName
      lastName
      nickname
      address
      photo
      phoneNumbers
      filter
    }
  }
`
export { REMOVE_CONTACT, ADD_CONTACT, UPDATE_CONTACT }
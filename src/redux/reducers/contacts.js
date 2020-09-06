import {
  FETCH_CONTACTS,
  SET_LOADING,
  CONTACT_ADDED,
  CONTACT_DELETED,
  RETRIEVED_CONTACT_FOR_UPADATE,
  CONTACT_UPDATED
} from '../types'

const initialState = {
  contacts: [],
  contactForUpdate: null,
  isLoading: false
}

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case CONTACT_DELETED:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        )
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case CONTACT_ADDED:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }

    case RETRIEVED_CONTACT_FOR_UPADATE:
      return {
        ...state,
        contactForUpdate: action.payload
      }

    case CONTACT_UPDATED:
      const idx = state.contacts.findIndex(({ id }) => id === action.payload.id)

      return {
        ...state,
        contacts: [
          ...state.contacts.slice(0, idx),
          action.payload,
          ...state.contacts.slice(idx + 1)
        ]
      }

    default:
      return state
  }
}
export default contactsReducer

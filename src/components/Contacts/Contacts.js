import React, { Fragment, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Contact from './Contact/Contact'
import { REQUEST_CONTACTS, REMOVE_CONTACT, ADD_TO_IGNORE } from '../../redux/types'
import Spinner from '../Spinner/Spinner'

const Contacts = (props) => {
  const contacts = useSelector((state) => state.contacts)
  const ignoredContacts = useSelector((state) => state.ignoredContacts)
  const isLoading = useSelector((state) => state.isLoading)
  const delContactId = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch({ type: REQUEST_CONTACTS })
    }
  }, [])

  const onDeleteHandler = (id) => {
    delContactId.current = id
    dispatch({ type: REMOVE_CONTACT, payload: id })
  }

  const onAddToIgnoreHandler = (contact) => {
    onDeleteHandler(contact.id)
    dispatch({type:ADD_TO_IGNORE, payload:contact})
    
  }

  let contactsList = (isLoading && contacts.length) === 0 ? <Spinner /> : null

  if (contacts.length > 0) {
    
    contactsList = contacts.map((contact) => {
      return (
        <Contact
          key={contact.id}
          contact={contact}
          isLoading={isLoading}
          onDeleteHandler={onDeleteHandler}
          idForDelete={delContactId.current}
          isIgnoreBtn={true}
          addToIgnore={onAddToIgnoreHandler}
        />
      )
    })
  }

  return (
    <Fragment>
      <h1 className="display-4 mb-2">
        <span className="text-danger">Contact</span> List
      </h1>
      {contactsList}
    </Fragment>
  )
}

export default Contacts

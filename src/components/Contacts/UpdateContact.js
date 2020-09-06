import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Spinner from '../Spinner/Spinner'
import TextInputGroup from '../layout/TextInputGroup'
import {
  GET_CONTACT,
  UPDATE_CONTACT,
  RETRIEVED_CONTACT_FOR_UPADATE
} from '../../redux/types'

function UpdateContact(props) {
  const contact = useSelector((state) => state.contactForUpdate)
  const isLoading = useSelector((state) => state.isLoading)

  const [state, setState] = useState({
    name: '',
    email: '',
    role: '',
    picture: ''
  })

  const dispatch = useDispatch()

  const { name, email, role, picture } = state

  useEffect(() => {
    const { id } = props.match.params
    dispatch({ type: GET_CONTACT, payload: id })
    return () => {
      dispatch({ type: RETRIEVED_CONTACT_FOR_UPADATE, payload: null })
    }
  }, [])

  useEffect(() => {
    if (contact) {
      setState({
        ...state,
        name: contact.name,
        email: contact.email,
        role: contact.role,
        picture: contact.picture
      })
    }
  }, [contact])

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const newContact = {
      name,
      email,
      role,
      picture
    }

    dispatch({ type: UPDATE_CONTACT, payload: { id: contact.id, newContact } })
    props.history.push('/')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="card mb-3">
      <div className="card-header">Update Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={onChange}
          />

          <TextInputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={onChange}
          />

          <TextInputGroup
            label="Role"
            name="role"
            placeholder="Enter Role"
            value={role}
            onChange={onChange}
          />

          <TextInputGroup
            label="Picture"
            name="picture"
            placeholder="Enter Picture URL"
            value={picture}
            onChange={onChange}
          />

          <input
            type="submit"
            value="Update Contact"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  )
}

export default UpdateContact

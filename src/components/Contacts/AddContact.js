import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextInputGroup from '../layout/TextInputGroup'
import { ADD_CONTACT } from '../../redux/types'

function AddContact(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    role: '',
    picture: ''
  })
  const dispatch = useDispatch()

  const { name, email, role, picture } = state

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newContact = {
      name,
      email,
      role,
      picture
    }
    // contactsApi.addContact(newContact)
    // contactService.addContact(newContact).then(res => contactAdd(res.data));
    dispatch({ type: ADD_CONTACT, payload: newContact })
    props.history.push('/')
  }

  return (
    <div className="card mb-3">
      <div className="card-header">Add Contact</div>
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
            value="Add Contact"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  )
}

export default AddContact
// if (name === "") {
//   this.setState({
//     errors: {
//       name: "Name is Required"
//     }
//   });
//   return;
// }

// if (email === "") {
//   this.setState({
//     errors: {
//       email: "Email is Required"
//     }
//   });
//   return;
// }

// if (phone === "") {
//   this.setState({
//     errors: {
//       phone: "Phone is Required"
//     }
//   });
//   return;
// }

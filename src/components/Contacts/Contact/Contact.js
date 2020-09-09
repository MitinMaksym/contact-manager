import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Contact.scss'
import loader from '../../../assets/small-loader.gif'
import Avatar from '../../layout/Avatar/Avatar'

function Contact(props) {
  const [showContactInfo, toggeleContactInfo] = useState(false)

  const {
    contact: { id, name, email, role, picture },
    onDeleteHandler,
    isLoading,
    idForDelete,
    addToIgnore
  } = props

  return (
    <div className="card card-body mb-3">
      <h4>
        {name}{' '}
        <i
          onClick={() => {
            toggeleContactInfo((prevValue) => !prevValue)
          }}
          className="fa fa-sort-down"
          style={{ cursor: 'pointer' }}
        />
        {isLoading & (id === idForDelete) ? (
          <img
            style={{ width: '18.86px', height: '18.86px', float: 'right' }}
            src={loader}
            alt="loader"
          />
        ) : (
          <i
            className="fa fa-times"
            style={{ cursor: 'pointer', color: 'red', float: 'right' }}
            onClick={() => {
              onDeleteHandler(id)
            }}
          />
        )}
        <Link to={`contact/update/${id}`}>
          <i
            className="fa fa-pencil"
            style={{
              cursor: 'pointer',
              color: 'black',
              float: 'right',
              marginRight: '1rem'
            }}
          />
        </Link>
      { props.isIgnoreBtn && <Link to={`/contact/ignored`}>
          <i onClick = {() => {addToIgnore(props.contact)}}
            className="fa fa-address-book"
            style={{
              cursor: 'pointer',
              color: 'black',
              float: 'right',
              marginRight: '1rem'
            }}
          />
        </Link>}
      </h4>
      {showContactInfo ? (
        <div className="contactInfo ">
          {<Avatar picture={picture} />}
          <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{role}</li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact

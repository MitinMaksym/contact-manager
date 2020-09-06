import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ picture }) => {
  return (
    <img
      className="rounded  d-block mr-3 contactInfo__avatar"
      src={
        picture
          ? picture
          : 'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883'
      }
      alt="UserPhoto"
    ></img>
  )
}

Avatar.propTypes = {
  picture: PropTypes.string
}
export default Avatar

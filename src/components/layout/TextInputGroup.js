import React from 'react'
import PropTypes from 'prop-types'

function TextInputGroup({ label, type, name, placeholder, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={'form-control form-control-lg'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

TextInputGroup.defaultProps = {
  type: 'text'
}

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
export default TextInputGroup

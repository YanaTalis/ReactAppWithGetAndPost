import React from 'react'
import './RadioButton.scss'

// radio component
function RadioButton({
  name,
  value,
  checked,
  onChange,
  children,
  className = '',
}) {
  return (
    // wrapper for the radio button
    <label className={`radio ${className}`}>
      {/* input element */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {/* Custom radio button look */}
      <span className="radio__custom"></span>
      {/* Label for the radio button */}
      <span className="radio__label">{children}</span>
    </label>
  )
}

export default RadioButton

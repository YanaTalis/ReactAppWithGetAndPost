import React from 'react'
import './Input.scss'

// input component with standard props
function Input({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  helperText,
  error = false,
  className = '',
  ...props
}) {
  return (
    <div className={`input ${className}`}>
      {/* Input field */}
      <input
        className={`input__field ${error ? 'input__field--error' : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {/* helper text */}
      {helperText && (
        <p
          className={`input__helper-text ${
            error ? 'input__helper-text--error' : ''
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input

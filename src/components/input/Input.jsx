import React from 'react'
import { cx } from '../../utils/classNames'
import styles from './Input.module.scss'

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
    <div className={cx(styles.input, className)}>
      <input
        className={cx(styles['input__field'], {
          [styles['input__field--error']]: error,
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {helperText && (
        <p
          className={cx(styles['input__helper-text'], {
            [styles['input__helper-text--error']]: error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input

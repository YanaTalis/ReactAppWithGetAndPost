import React from 'react'
import './button.scss'

// MultiPurpose button
function Button({
  children,
  variant = 'primary',
  onClick,
  className,
  ...props
}) {
  // formats the button class
  const buttonClasses = `btn btn--${variant}${className ? ` ${className}` : ''}`

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button

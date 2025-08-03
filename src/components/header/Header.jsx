import React from 'react'
import logoImg from '/src/img/logo.svg'
import Button from '../button/Button'
import './header.scss'

// Header's component
function Header({ postSectionRef }) {
  // Function, that works when we clic on btn Users
  const handleUsersClick = () => {
    console.log('Users clicked')
  }

  // When SignUp clicked, we go to postFormSection
  const handleSignUpClick = () => {
    if (postSectionRef && postSectionRef.current) {
      postSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      {/* logo & buttons */}
      <div className="container">
        <div className="header__row">
          {/* logo */}
          <div className="header__logo">
            <img src={logoImg} alt="logoAbz" />
            <span>testtask</span>
          </div>
          {/* buttons */}
          <nav className="header__nav">
            <ul className="nav-list">
              <li>
                <Button variant="primary" onClick={handleUsersClick}>
                  Users
                </Button>
              </li>
              <li>
                <Button variant="primary" onClick={handleSignUpClick}>
                  Sign up
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

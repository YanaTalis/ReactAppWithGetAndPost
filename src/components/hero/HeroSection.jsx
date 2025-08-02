import React from 'react'
import Button from '../button/Button'
import './HeroSection.scss'

// Hero's component
function HeroSection({ postSectionRef }) {
  // When SignUp clicked, we go to postFormSection
  const handleSignUpClick = () => {
    if (postSectionRef && postSectionRef.current) {
      postSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container">
        {/* title */}
        <h1 className="hero__title">Test assignment for front-end developer</h1>
        {/* description */}
        <p className="hero__text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        {/* button from component */}
        <Button variant="primary" onClick={handleSignUpClick}>
          Sign up
        </Button>
      </div>
    </section>
  )
}

export default HeroSection

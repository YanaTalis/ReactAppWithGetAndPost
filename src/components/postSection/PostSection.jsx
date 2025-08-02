import React, { useState, forwardRef } from 'react'
import Button from '../button/Button'
import Input from '../input/Input'
import RadioButton from '../radio/RadioButton'
import FileUpload from '../uploadPhoto/FileUpload'
import './PostSection.scss'

// postSection component
const PostSection = forwardRef((props, ref) => {
  // state for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: null,
  })

  // handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // handler for foto input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }))
  }

  // handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here I add sending data into the console
    console.log(formData)
  }

  // array of positions for radio buttons
  const positions = [
    'Frontend developer',
    'Backend developer',
    'Designer',
    'QA',
  ]

  return (
    <section className="post" ref={ref}>
      <div className="container">
        {/* title*/}
        <h2 className="post__title">Working with POST request</h2>

        {/* Форма регистрации */}
        <form className="post__form" onSubmit={handleSubmit}>
          <div className="post__inputs">
            {/* name */}
            <Input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* email */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* phone */}
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              helperText="+38 (XXX) XXX - XX - XX"
            />
          </div>

          {/* Radio buttons for position selection */}
          <div className="post__position">
            <p className="post__label">Select your position</p>
            <div className="post__radio-group">
              {positions.map((pos) => (
                <RadioButton
                  key={pos}
                  name="position"
                  value={pos}
                  checked={formData.position === pos}
                  onChange={handleChange}
                >
                  {pos}
                </RadioButton>
              ))}
            </div>
          </div>

          {/* Upload photo */}
          <FileUpload onChange={handleFileChange} file={formData.photo} />

          {/* Button for form submission, blocked if not all fields are filled */}
          <Button
            variant="primary"
            type="submit"
            className="post__submit"
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.position ||
              !formData.photo
            }
          >
            Sign up
          </Button>
        </form>
      </div>
    </section>
  )
})

export default PostSection

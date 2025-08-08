import React, { useState, forwardRef, useEffect } from 'react'
import Button from '../button/Button'
import Input from '../input/Input'
import RadioButton from '../radio/RadioButton'
import FileUpload from '../uploadPhoto/FileUpload'
import ModalSuccess from '../modal/ModalSuccess'
import { getPositions } from '../../api/apiGet'
import { registerUser } from '../../api/apiPost'
import { useValidationHook } from '../../useValidationHook'
import styles from './PostSection.module.scss'

// postSection component
const PostSection = forwardRef(({ onSuccessRegistration }, ref) => {
  // state for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: null,
  })

  // states for positions
  const [positions, setPositions] = useState([]) // from server
  const [positionsLoading, setPositionsLoading] = useState(true)
  const [positionsError, setPositionsError] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showModalSuccess, setShowModalSuccess] = useState(false)

  const {
    // use my hook for validation
    validateField,
    validateFormData,
    setFieldChanged,
    getFieldError,
    isFormValid,
    clearErrors,
  } = useValidationHook()

  // useEffect for loading positions
  useEffect(() => {
    loadPositions()
  }, [])

  // function to load positions from API
  const loadPositions = async () => {
    try {
      const data = await getPositions()

      if (data.success) {
        setPositions(data.positions)
      } else {
        setPositionsError('Failed to load positions')
      }
    } catch (error) {
      setPositionsError('Error loading positions: ' + error.message)
    } finally {
      setPositionsLoading(false)
    }
  }

  // if client change input
  const handleBlur = (e) => {
    const { name, value } = e.target
    setFieldChanged(name)
    validateField(name, value)
  }

  // handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // handler for foto input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      console.log('Selected file:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      })

      setFormData((prev) => ({ ...prev, photo: file }))

      // mark
      setFieldChanged('photo')
      validateField('photo', file)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position_id: '',
      photo: null,
    })
    clearErrors()
    setIsSubmitted(false)
  }

  // handler for submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

    Object.keys(formData).forEach((fieldName) => {
      setFieldChanged(fieldName)
    })

    const isValid = validateFormData(formData)

    if (isValid) {
      setIsSubmitted(true)
      console.log('Sending data')
      try {
        const formDataToSend = {
          ...formData,
          position_id: parseInt(formData.position_id, 10),
        }

        console.log('Sending registration data:', formDataToSend)
        const result = await registerUser(formDataToSend)

        console.log('Registration response:', result)

        if (result.success) {
          console.log('Registration successful')
          setShowModalSuccess(true)

          if (onSuccessRegistration) {
            onSuccessRegistration()
          }
          setTimeout(() => {
            resetForm()
          }, 1111)
        } else {
          // Handle server error with message
          console.error(
            'Registration failed with server message:',
            result.message,
            'Fails:',
            result.fails || {}
          )
          alert('Registration failed: ' + (result.message || 'Unknown error'))
        }
      } catch (error) {
        console.error('Registration failed:', error)
        alert('Registration failed: ' + error.message)
      } finally {
        setIsSubmitted(false)
      }
    }
  }

  // to close window after 2.5sec
  useEffect(() => {
    if (showModalSuccess) {
      const timer = setTimeout(() => {
        setShowModalSuccess(false)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [showModalSuccess])

  // handler fo radio positions
  const handlePositionChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, position_id: value }))

    setFieldChanged('position_id')
    validateField('position_id', value)
  }

  // array of positions for radio buttons
  // const positions = [
  //   `Frontend developer`,
  //   'Backend developer',
  //   'Designer',
  //   'QA',
  // ]

  // {
  //   positions.map((position, index) => (
  //     <RadioButton key={index} value={position}>
  //       {position}
  //     </RadioButton>
  //   ))
  // }

  return (
    <section className={styles.post} ref={ref}>
      <div className="container">
        <h2 className={styles['post__title']}>Working with POST request</h2>

        <form className={styles['post__form']} onSubmit={handleSubmit}>
          <div className={styles['post__inputs']}>
            <Input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('name')}
              disabled={isSubmitted}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('email')}
              disabled={isSubmitted}
            />

            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText="+38 (XXX) XXX - XX - XX"
              error={getFieldError('phone')}
              disabled={isSubmitted}
            />
          </div>

          <div className={styles['post__position']}>
            <p className={styles['post__label']}>Select your position</p>
            <div className={styles['post__radio-group']}>
              {positionsLoading ? (
                <p>Loading positions...</p>
              ) : positionsError ? (
                <div style={{ color: 'red' }}>
                  <p>{positionsError}</p>
                  <button type="button" onClick={loadPositions}>
                    Try again
                  </button>
                </div>
              ) : (
                positions.map((position) => (
                  <RadioButton
                    key={position.id}
                    name="position_id"
                    value={position.id.toString()}
                    checked={formData.position_id === position.id.toString()}
                    onChange={handlePositionChange}
                    disabled={isSubmitted}
                  >
                    {position.name}
                  </RadioButton>
                ))
              )}
            </div>
          </div>

          <FileUpload
            onChange={handleFileChange}
            file={formData.photo}
            error={!!getFieldError('photo')}
            errorText={getFieldError('photo')}
            accept=".jpg,.jpeg"
            disabled={isSubmitted}
          />

          <Button
            variant="primary"
            type="submit"
            className={styles['post__submit']}
            disabled={!isFormValid(formData) || positionsLoading || isSubmitted}
          >
            Sign up
          </Button>
        </form>
      </div>
      {showModalSuccess && <ModalSuccess />}
    </section>
  )
})

export default PostSection

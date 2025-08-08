// address of our server
const MAIN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

// we need to recieve token
export const getToken = async () => {
  try {
    const response = await fetch(`${MAIN_URL}/token`)

    if (!response.ok) {
      throw new Error(`Error of getting token! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.token
  } catch (error) {
    console.error('Token error:', error)
    throw error
  }
}

// Function for user registration
export const registerUser = async (formData) => {
  try {
    // Use token
    const token = await getToken()

    // Create FormData object to send data including file
    const dataToSend = new FormData()
    dataToSend.append('name', formData.name)
    dataToSend.append('email', formData.email)
    dataToSend.append('phone', formData.phone)
    dataToSend.append('position_id', formData.position_id)
    dataToSend.append('photo', formData.photo)

    // Send to server
    const response = await fetch(`${MAIN_URL}/users`, {
      method: 'POST',
      headers: {
        Token: token,
      },
      body: dataToSend,
    })

    // json -> obj
    const result = await response.json()
    console.log('Response from server:', result)

    // if not res
    if (!result.success) {
      throw new Error(result.message || 'Registration wrong!')
    }

    return result
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

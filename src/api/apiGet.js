// address of our server
const MAIN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

// function for requests
const apiRequest = async (endpoint) => {
  try {
    // send request to server
    const response = await fetch(`${MAIN_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json', // work with json
      },
    })
    console.log('Receive answer:', response)

    // Check if server doesn't answered successfully then err
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }

    // To modify json to object JS
    const data = await response.json()
    console.log('Receive data:', data)

    // Our users already sorted by registration date
    // checking:
    if (data.users) {
      console.log('Users sorting check:')
      data.users.forEach((user, index) => {
        console.log(
          `${index + 1}. ${user.name} - registered: ${
            user.registration_timestamp
          }`
        )
      })
    }

    return data
  } catch (error) {
    // If something went wrong - throw error
    throw new Error(`API request failed for ${endpoint}: ${error.message}`)
  }
}

// function for getting the list of users
// now we want to show only 6 people (default)
export const getUsers = async (page = 1, count = 6) => {
  return apiRequest(`/users?page=${page}&count=${count}`)
}

// function for getting the list of positions
// use endpoint '/positions'
export const getPositions = async () => {
  return apiRequest('/positions')
}

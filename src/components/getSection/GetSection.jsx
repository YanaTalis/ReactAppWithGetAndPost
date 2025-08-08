import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import CardPerson from './../card/CardPerson'
import Button from '../button/Button'
import { getUsers } from '../../api/apiGet'
import styles from './GetSection.module.scss'

// Mock data from figma
// Import images for workers photos
// import photoSalvador from '../../img/Salvador.jpg'
// import photoTakamaru from '../../img/Takamaru.jpg'
// import photoAlexandre from '../../img/Alexandre.jpg'
// import photoIlya from '../../img/Ilya.jpg'
// import photoWinny from '../../img/Winny.jpg'
// import photoSimon from '../../img/Simon.jpg'

// Array with workers data
// const workers = [
//   {
//     id: 1,
//     photo: photoSalvador,
//     name: 'Salvador Stewart Flynn Thomas Salva Salve...',
//     position: 'Leading specialist of the department of cent...',
//     email: 'JeromeKlarkaJeromeKlarka1923362362...',
//     phone: '+38 (098) 278 76 24',
//   },
//   {
//     id: 2,
//     photo: photoTakamaru,
//     name: 'Takamaru Ayako Jurrien',
//     position: 'Lead Independent Director',
//     email: 'Takamuru@gmail.com',
//     phone: '+38 (098) 278 90 24',
//   },
//   {
//     id: 3,
//     photo: photoIlya,
//     name: 'Ilya',
//     position: 'Co-Founder and CEO',
//     email: 'Ilya_founder@gmail.com',
//     phone: '+38 (098) 235 44 24',
//   },
//   {
//     id: 4,
//     photo: photoAlexandre,
//     name: 'Alexandre',
//     position: 'Lead Independent Director',
//     email: 'Alexandr_develop@gmail.com',
//     phone: '+38 (098) 198 44 24',
//   },
//   {
//     id: 5,
//     photo: photoWinny,
//     name: 'Winny',
//     position: 'Former Senior Director',
//     email: 'Winny_develop@gmail.com',
//     phone: '+38 (098) 278 22 88',
//   },
//   {
//     id: 6,
//     photo: photoSimon,
//     name: 'Simon',
//     position: 'President of Commerce',
//     email: 'Simon@gmail.com',
//     phone: '+38 (098) 278 44 00',
//   },
//   {
//     id: 7,
//     photo: photoSalvador,
//     name: 'Salvador Stewart Flynn Thomas Salva...',
//     position: 'Leading specialist of the department o...',
//     email: 'JeromeKlarkaJeromeKlarka19233623...',
//     phone: '+38 (098) 278 76 24',
//   },
//   {
//     id: 8,
//     photo: photoTakamaru,
//     name: 'Takamaru Ayako Jurrien',
//     position: 'Lead Independent Director',
//     email: 'Takamuru@gmail.com',
//     phone: '+38 (098) 278 90 24',
//   },
//   {
//     id: 9,
//     photo: photoIlya,
//     name: 'Ilya',
//     position: 'Co-Founder and CEO',
//     email: 'Ilya_founder@gmail.com',
//     phone: '+38 (098) 235 44 24',
//   },
//   {
//     id: 10,
//     photo: photoAlexandre,
//     name: 'Alexandre',
//     position: 'Lead Independent Director',
//     email: 'Alexandr_develop@gmail.com',
//     phone: '+38 (098) 198 44 24',
//   },
//   {
//     id: 11,
//     photo: photoWinny,
//     name: 'Winny',
//     position: 'Former Senior Director',
//     email: 'Winny_develop@gmail.com',
//     phone: '+38 (098) 278 22 88',
//   },
//   {
//     id: 12,
//     photo: photoSimon,
//     name: 'Simon',
//     position: 'President of Commerce',
//     email: 'Simon@gmail.com',
//     phone: '+38 (098) 278 44 00',
//   },
// ]

// const [visibleCount, setVisibleCount] = useState(6)
//
// const handleShowMore = () => {
//   setVisibleCount((prev) => prev + 6)
// }
//
// {workers.slice(0, visibleCount).map((worker) => (
//   <CardPerson
//     key={worker.id}
//     photo={worker.photo}
//     name={worker.name}
//     position={worker.position}
//     email={worker.email}
//     phone={worker.phone}
//   />
// ))}
//
// {visibleCount < workers.length && (
//   <div className={styles['get__button-wrapper']}>
//     <Button
//       variant="primary"
//       onClick={handleShowMore}
//       className={styles['get__show-more-btn']}
//     >
//       Show more
//     </Button>
//   </div>
// )}

// GetSection component with API
const GetSection = forwardRef((props, ref) => {
  // States for showing API data
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  // Expose refreshUsers function to parent component
  useImperativeHandle(ref, () => ({
    refreshUsers: () => {
      loadUsers(1, true)
    }
  }))
  const [page, setPage] = useState(1)

  // Load users on first render
  useEffect(() => {
    loadUsers(1, true) // true = replase data
  }, [])

  // Function to load users from server
  const loadUsers = async (pageNumber, replace = false) => {
    setLoading(true)
    setError(null)

    try {
      const data = await getUsers(pageNumber, 6)

      if (data.success) {
        let newUsers = data.users

        // Sort users by registration date to do newest first (optional)
        newUsers = newUsers.sort((a, b) => {
          return b.registration_timestamp - a.registration_timestamp
        })

        // replace first data or add new data
        if (replace) {
          setUsers(newUsers)
        } else {
          setUsers((prevUsers) => [...prevUsers, ...newUsers])
        }

        setPage(pageNumber)

        // Check if there are more pages
        setHasMore(pageNumber < data.total_pages)
      } else {
        setError('Error loading users')
        console.error('API doesnt returned success')
      }
    } catch (err) {
      setError('Error loading users: ' + err.message)
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handler for btn Show more
  const handleShowMore = () => {
    const nextPage = page + 1
    console.log(`📖 Loading next page: ${nextPage}`)
    loadUsers(nextPage, false) // false = add new data
  }

  // Show error message
  if (error) {
    return (
      <section className={styles.get}>
        <div className="container">
          <h2 className={styles['get__title']}>Working with GET request</h2>
          <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
            <p>{error}</p>
            <Button variant="primary" onClick={() => loadUsers(1, true)}>
              Try again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.get}>
      <div className="container">
        <h2 className={styles['get__title']}>Working with GET request</h2>

        {/* Display users from API */}
        <div className={styles['get__list']}>
          {users.map((user) => (
            <CardPerson
              key={user.id}
              photo={user.photo}
              name={user.name}
              position={user.position}
              email={user.email}
              phone={user.phone}
            />
          ))}
        </div>

        {/* Show button if there are more users */}
        {hasMore && (
          <div className={styles['get__button-wrapper']}>
            <Button
              variant="primary"
              onClick={handleShowMore}
              className={styles['get__show-more-btn']}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Show more'}
            </Button>
          </div>
        )}

        {/* Show loading indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Loading users...</p>
          </div>
        )}

        {/* Show message when no more data */}
        {!hasMore && users.length > 0 && !loading && (
          <div
            style={{ textAlign: 'center', padding: '20px', color: '#7e7e7e' }}
          >
            <p>No more users available</p>
          </div>
        )}
      </div>
    </section>
  )
})

export default GetSection

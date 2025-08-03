import React, { useState } from 'react'
import CardPerson from './../card/CardPerson'
import Button from '../button/Button'
import './GetSection.scss'

// Import images for workers photos
import photoSalvador from '/src/img/Salvador.jpg'
import photoTakamaru from '/src/img/Takamaru.jpg'
import photoAlexandre from '/src/img/Alexandre.jpg'
import photoIlya from '/src/img/Ilya.jpg'
import photoWinny from '/src/img/Winny.jpg'
import photoSimon from '/src/img/Simon.jpg'

// Array with workers data (mock data)
const workers = [
  {
    id: 1,
    photo: photoSalvador,
    name: 'Salvador Stewart Flynn Thomas Salva Salve...',
    position: 'Leading specialist of the department of cent...',
    email: 'JeromeKlarkaJeromeKlarka1923362362...',
    phone: '+38 (098) 278 76 24',
  },
  {
    id: 2,
    photo: photoTakamaru,
    name: 'Takamaru Ayako Jurrien',
    position: 'Lead Independent Director',
    email: 'Takamuru@gmail.com',
    phone: '+38 (098) 278 90 24',
  },
  {
    id: 3,
    photo: photoIlya,
    name: 'Ilya',
    position: 'Co-Founder and CEO',
    email: 'Ilya_founder@gmail.com',
    phone: '+38 (098) 235 44 24',
  },
  {
    id: 4,
    photo: photoAlexandre,
    name: 'Alexandre',
    position: 'Lead Independent Director',
    email: 'Alexandr_develop@gmail.com',
    phone: '+38 (098) 198 44 24',
  },
  {
    id: 5,
    photo: photoWinny,
    name: 'Winny',
    position: 'Former Senior Director',
    email: 'Winny_develop@gmail.com',
    phone: '+38 (098) 278 22 88',
  },
  {
    id: 6,
    photo: photoSimon,
    name: 'Simon',
    position: 'President of Commerce',
    email: 'Simon@gmail.com',
    phone: '+38 (098) 278 44 00',
  },
  {
    id: 7,
    photo: photoSalvador,
    name: 'Salvador Stewart Flynn Thomas Salva...',
    position: 'Leading specialist of the department o...',
    email: 'JeromeKlarkaJeromeKlarka19233623...',
    phone: '+38 (098) 278 76 24',
  },
  {
    id: 8,
    photo: photoTakamaru,
    name: 'Takamaru Ayako Jurrien',
    position: 'Lead Independent Director',
    email: 'Takamuru@gmail.com',
    phone: '+38 (098) 278 90 24',
  },
  {
    id: 9,
    photo: photoIlya,
    name: 'Ilya',
    position: 'Co-Founder and CEO',
    email: 'Ilya_founder@gmail.com',
    phone: '+38 (098) 235 44 24',
  },
  {
    id: 10,
    photo: photoAlexandre,
    name: 'Alexandre',
    position: 'Lead Independent Director',
    email: 'Alexandr_develop@gmail.com',
    phone: '+38 (098) 198 44 24',
  },
  {
    id: 11,
    photo: photoWinny,
    name: 'Winny',
    position: 'Former Senior Director',
    email: 'Winny_develop@gmail.com',
    phone: '+38 (098) 278 22 88',
  },
  {
    id: 12,
    photo: photoSimon,
    name: 'Simon',
    position: 'President of Commerce',
    email: 'Simon@gmail.com',
    phone: '+38 (098) 278 44 00',
  },
]

// GetSection component
function GetSection() {
  // how many cards to show
  const [visibleCount, setVisibleCount] = useState(6)

  // how many more cards to show when "Show more" is clicked
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <section className="get">
      <div className="container">
        {/* title */}
        <h2 className="get__title">Working with GET request</h2>

        {/* List of workers cards */}
        <div className="get__list">
          {workers.slice(0, visibleCount).map((worker) => (
            <CardPerson
              key={worker.id}
              photo={worker.photo}
              name={worker.name}
              position={worker.position}
              email={worker.email}
              phone={worker.phone}
            />
          ))}
        </div>

        {/* if there are more workers to show */}
        {visibleCount < workers.length && (
          <div className="get__button-wrapper">
            <Button
              variant="primary"
              onClick={handleShowMore}
              className="get__show-more-btn"
            >
              Show more
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default GetSection

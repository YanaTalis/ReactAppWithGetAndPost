import React from 'react'
import './CardPerson.scss'

// cards for people in the team
function CardPerson({ photo, name, position, email, phone }) {
  return (
    <div className="person-card">
      {/* foto */}
      <img className="person-card__photo" src={photo} alt={name} />
      {/* name */}
      <p className="person-card__name">{name}</p>
      {/* description (position, email, phone) */}
      <div className="person-card__description">
        <p className="person-card__position">{position}</p>
        <p className="person-card__email">{email}</p>
        <p className="person-card__phone">{phone}</p>
      </div>
    </div>
  )
}

export default CardPerson

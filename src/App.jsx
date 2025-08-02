import React, { useRef } from 'react'
import Header from './components/header/Header.jsx'
import HeroSection from './components/hero/HeroSection.jsx'
import GetSection from './components/getSection/GetSection.jsx'
import PostSection from './components/postSection/PostSection.jsx'

const App = () => {
  // Создаём ref для передачи в PostSection и прокрутки к нему из Header
  const postSectionRef = useRef(null)
  return (
    <div>
      {/* Шапка сайта, передаём ref для прокрутки */}
      <Header postSectionRef={postSectionRef} />
      {/* Главный баннер */}
      <HeroSection postSectionRef={postSectionRef}/>
      {/* Секция с пользователями */}
      <GetSection />
      {/* Секция с формой регистрации, прокрутка по ref */}
      <PostSection ref={postSectionRef} />
    </div>
  )
}

export default App

import React, { useRef } from 'react'
import Header from './components/header/Header.jsx'
import HeroSection from './components/hero/HeroSection.jsx'
import GetSection from './components/getSection/GetSection.jsx'
import PostSection from './components/postSection/PostSection.jsx'

const App = () => {
  // create ref for  PostSection and go to it from Header
  const postSectionRef = useRef(null)
  return (
    <div>
      <Header postSectionRef={postSectionRef} />
      <HeroSection postSectionRef={postSectionRef}/>
      <GetSection />
      <PostSection ref={postSectionRef} />
    </div>
  )
}

export default App

import type { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './components/Carousel/EmblaCarousel.tsx'
import './components/Carousel/embla.css'
import Header from './components/Header/index'

import { useState } from 'react'

const App = () => {
  const OPTIONS: EmblaOptionsType = { loop: true }
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  return (
    <>
      <Header onMenuHover={setIsMenuHovered} />
      <main className={`transition-all duration-300 ease-in-out ${isMenuHovered ? 'blur-sm' : ''}`}>
        <EmblaCarousel options={OPTIONS} />
      </main>
    </>
  )
}

export default App

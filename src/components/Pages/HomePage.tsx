import { useState } from 'react'
import EmblaCarousel from '../../components/Carousel/EmblaCarousel.tsx'
import '../../components/Carousel/embla.css'
import Header from '../../components/Header/index.tsx'

const HomePage = () => {
  const [isMenuHovered, setIsMenuHovered] = useState(false)

  return (
    <>
      <Header onMenuHover={setIsMenuHovered} />
      <main className={`transition-all duration-300 ease-in-out ${isMenuHovered ? 'blur-sm' : ''}`}>
        <EmblaCarousel options={{ loop: true }} />
      </main>
    </>
  )
}

export default HomePage

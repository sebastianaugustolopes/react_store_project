import type { EmblaOptionsType } from "embla-carousel"
import EmblaCarousel from "./components/Carousel/EmblaCarousel.tsx"
import "./components/Carousel/embla.css" 
import Header from './components/Header/index'
 const OPTIONS: EmblaOptionsType = { loop: true }
const App = () => {
  // Carousel configuration options (loop
  return (
    <>
      <Header />
      <EmblaCarousel options={OPTIONS} />
    </>
  )
}

export default App

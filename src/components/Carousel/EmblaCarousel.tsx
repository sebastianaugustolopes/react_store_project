import type { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '@/components/Button/index'

import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { CirclePlus } from 'lucide-react'

const TWEEN_FACTOR_BASE = 0.84
const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type Category = {
  id: number
  name: string
}

type Game = {
  id: string
  title: string
  imageUrl: string
  logoUrl?: string
  description?: string
  gamePageUrl?: string
  buttonText?: string
  originalPrice?: number
  currentPrice?: number
  discount?: number
  isFavorite?: boolean
  displayArea: 'SLIDE' | 'GALLERY' | 'BOTH'
  categories: Category[]
}

interface EmblaCarouselProps {
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)

  const [slidesData, setSlidesData] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/games')
      const data = await response.json()
      const slideGames = data.filter(
        (game: Game) => game.displayArea === 'SLIDE' || game.displayArea === 'BOTH'
      )
      setSlidesData(slideGames)
    } catch (error) {
      console.error('Erro ao carregar jogos para o carrossel:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenOpacity = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach(slideIndex => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach(loopItem => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const opacity = numberWithinRange(tweenValue, 0, 1).toString()
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)
  }, [emblaApi, setTweenFactor, tweenOpacity])

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isLoading) {
    return <div>Carregando carrossel...</div>
  }

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slidesData.map(slide => (
            <div
              className="embla__slide"
              key={slide.id}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="embla__slide__overlay flex flex-col justify-between h-full p-6">
                <Link to={`/jogo/${slide.gamePageUrl}`} className="text-white">
                  <div>
                    {slide.logoUrl ? (
                      <img className="logoUrl" src={slide.logoUrl} alt={slide.title} />
                    ) : null}
                    <p className="mb-2">{slide.description}</p>
                    {slide.currentPrice ? (
                      <span className="price font-bold text-lg hidden md:block">
                        R$ {slide.currentPrice.toFixed(2)}
                      </span>
                    ) : null}
                  </div>

                  <div className="hidden md:flex mt-4 gap-2">
                    <Button type="link" title="Visualizar Jogo" to={`/jogo/${slide.gamePageUrl}`}>
                      {slide.buttonText ?? 'Jogar agora'}
                    </Button>
                    <Button type="button" title="Adicionar ao carrinho" variant="default">
                      <CirclePlus /> Adicionar ao Carrinho
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isDesktop ? (
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      ) : null}
    </div>
  )
}

export default EmblaCarousel

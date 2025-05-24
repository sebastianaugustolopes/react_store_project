import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GameHero from '@/components/Pages/GamePage/GameHero'
import GameMedia from '@/components/Pages/GamePage/GameMedia'
import GameDetails from '@/components/Pages/GamePage/GameDetails'

interface Category {
  id: number
  name: string
}

interface Game {
  title: string
  imageUrl: string
  videoUrl: string
  logoUrl: string
  description: string
  originalPrice: number | null
  currentPrice?: number | null
  discount?: number
  buttonText: string
  gamePageUrl: string
  categories: Category[]
  isFavorite?: boolean
}

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('http://localhost:5000/api/games')
      .then(response => response.json())
      .then((data: Game[]) => {
        const foundGame = data.find((g: Game) => g.gamePageUrl === id)
        if (foundGame) {
          // Calculate discount percentage if not provided but has original and current price
          if (
            !foundGame.discount &&
            foundGame.originalPrice &&
            foundGame.currentPrice &&
            foundGame.originalPrice > foundGame.currentPrice
          ) {
            const discountPercentage = Math.round(
              ((foundGame.originalPrice - foundGame.currentPrice) / foundGame.originalPrice) * 100
            )
            foundGame.discount = discountPercentage
          }

          // If current price is not provided, set it the same as originalPrice
          if (!foundGame.currentPrice && foundGame.originalPrice) {
            foundGame.currentPrice = foundGame.originalPrice
          }

          setGame(foundGame)
        } else {
          setError('Jogo não encontrado.')
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Erro ao buscar dados do jogo.')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-white text-xl font-medium">Carregando jogo...</p>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Erro</h1>
          <p className="text-gray-400 text-lg">{error ?? 'Erro desconhecido.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Full-Width Background */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${game.imageUrl})`,
          minHeight: '80vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Column - Game Info */}
            <div className="space-y-8 flex flex-col justify-center">
              <GameHero
                game={{
                  title: game.title,
                  imageUrl: game.imageUrl,
                  logoUrl: game.logoUrl,
                  description: game.description,
                  categories: game.categories,
                  originalPrice: game.originalPrice,
                  currentPrice: game.currentPrice,
                  discount: game.discount,
                  buttonText: game.buttonText,
                }}
              />
            </div>

            {/* Right Column - Media */}
            <div className="w-full">
              <GameMedia
                game={{
                  title: game.title,
                  imageUrl: game.imageUrl,
                  videoUrl: game.videoUrl,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game Details Section - Full width with padding */}
      <div className="w-full py-16 bg-black/95 mt-8">
        <div className="container mx-auto px-6">
          <GameDetails
            game={{
              title: game.title,
              description: game.description,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GamePage

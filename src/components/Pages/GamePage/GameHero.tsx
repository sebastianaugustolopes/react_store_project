import React from 'react'
import { Star, Users, Calendar, Download, Heart, Share2 } from 'lucide-react'
import Button from '@/components/Button/index'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface Category {
  id: number
  name: string
}

interface GameHeroProps {
  game: {
    title: string
    imageUrl: string
    logoUrl: string
    description: string
    categories: Category[]
    originalPrice: number | null
    currentPrice?: number | null
    discount?: number
    buttonText: string
  }
}

const GameHero: React.FC<GameHeroProps> = ({ game }) => {
  const formatPrice = (price: number | null) => {
    if (price === null) return 'Grátis'
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  return (
    <div className="space-y-8">
      {/* Logo */}
      {game.logoUrl && (
        <div className="animate-fade-in">
          <img
            src={game.logoUrl}
            alt={`${game.title} logo`}
            className="h-32 w-auto object-contain"
          />
        </div>
      )}

      {/* Title (if no logo) */}
      {!game.logoUrl && (
        <h1 className="text-6xl font-bold text-white leading-tight animate-fade-in">
          {game.title}
        </h1>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 animate-fade-in">
        {game.categories.map(category => (
          <Badge
            key={category.id}
            variant="secondary"
            className="px-3 py-1.5 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Rating & Info */}
      <div className="flex flex-wrap items-center gap-6 text-white/80 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">4.8</span>
          <span className="text-sm opacity-70">(1,234 avaliações)</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span className="text-sm">Multijogador</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">2024</span>
        </div>
      </div>

      {/* Description Preview */}
      <div className="text-white/80 line-clamp-3 text-lg animate-fade-in">
        {game.description.substring(0, 150)}...
      </div>

      {/* Purchase Section */}
      <Card className="bg-black/40 backdrop-blur-md border-white/20 p-6 animate-fade-in">
        <div className="space-y-6">
          {/* Price Display with Discount */}
          <div className="flex items-center space-x-3">
            {game.discount && game.discount > 0 && (
              <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                -{game.discount}%
              </div>
            )}

            <div className="flex items-baseline space-x-3">
              {game.discount && game.discount > 0 && game.originalPrice && (
                <span className="text-xl text-white/60 line-through">
                  {formatPrice(game.originalPrice)}
                </span>
              )}
              <span className="text-3xl font-bold">
                {formatPrice(game.currentPrice ?? game.originalPrice)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button title="Adicionar ao carrinho" type="button" variant="primary">
              <Download className="h-5 w-5 mr-2" />
              {game.buttonText}
            </Button>

            <div className="flex space-x-3">
              <Button title="Adicionar aos favoritos" type="button" variant="primary">
                <Heart className="h-5 w-5" />
              </Button>
              <Button title="Compartilhar" type="button" variant="primary">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GameHero

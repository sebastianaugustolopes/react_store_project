import React, { useState } from 'react'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface GameMediaProps {
  game: {
    title: string
    imageUrl: string
    videoUrl: string
  }
}

const GameMedia: React.FC<GameMediaProps> = ({ game }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/
    )
    return match ? match[1] : null
  }

  const videoId = getYouTubeVideoId(game.videoUrl)

  const mediaItems = [
    { type: 'image', url: game.imageUrl, title: 'Screenshot' },
    { type: 'video', url: game.videoUrl, title: 'Trailer', videoId },
  ]

  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    setCurrentMediaIndex(1)
  }

  const handleMediaNavigation = (direction: 'next' | 'prev') => {
    setCurrentMediaIndex(prev => (direction === 'next' ? (prev === 1 ? 0 : 1) : prev === 0 ? 1 : 0))
    setIsVideoPlaying(false)
  }

  return (
    <div className="space-y-6">
      {/* Main Media Display */}
      <Card className="overflow-hidden bg-black border-gray-800">
        <div className="relative aspect-video">
          {currentMediaIndex === 0 || !isVideoPlaying ? (
            <div className="relative group h-full">
              <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
              {game.videoUrl && (
                <Button
                  onClick={handlePlayVideo}
                  variant="ghost"
                  size="lg"
                  className="absolute inset-0 w-full h-full bg-black/40 hover:bg-black/30 group-hover:bg-black/20 transition-all duration-300 rounded-none"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </Button>
              )}
            </div>
          ) : (
            <div className="w-full h-full">
              {videoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={`${game.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={game.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {game.videoUrl && (
            <>
              <Button
                onClick={() => handleMediaNavigation('prev')}
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={() => handleMediaNavigation('next')}
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Media Thumbnails */}
      {game.videoUrl && (
        <div className="flex space-x-4">
          {mediaItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                setCurrentMediaIndex(index)
                setIsVideoPlaying(false)
              }}
              variant="ghost"
              className={`relative p-0 rounded-lg overflow-hidden transition-all duration-300 ${
                currentMediaIndex === index && (index === 0 || !isVideoPlaying)
                  ? 'ring-2 ring-blue-500 opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              <div className="w-32 h-18 relative">
                <img src={game.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GameMedia

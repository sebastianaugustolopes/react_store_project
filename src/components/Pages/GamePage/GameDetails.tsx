import React from 'react'
import { Tag, Monitor, Cpu, HardDrive, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface GameDetailsProps {
  game: {
    title: string
    description: string
  }
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  return (
    <div className="container mx-auto px-6 space-y-12">
      {/* Description Section */}
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-8">Sobre este jogo</h2>
        <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
          <CardContent className="p-8">
            <p className="text-gray-300 leading-relaxed text-lg">{game.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* System Requirements & Additional Info */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* System Requirements */}
        <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center space-x-3">
              <Monitor className="h-6 w-6" />
              <span>Requisitos do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Mínimos</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>SO:</span>
                  </div>
                  <span className="text-sm">Windows 10 64-bit</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4" />
                    <span>Processador:</span>
                  </div>
                  <span className="text-sm">Intel i5-8400</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Memória:</span>
                  </div>
                  <span className="text-sm">8 GB RAM</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4" />
                    <span>Placa de Vídeo:</span>
                  </div>
                  <span className="text-sm">GTX 1060</span>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Recomendados</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>SO:</span>
                  </div>
                  <span className="text-sm">Windows 11 64-bit</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4" />
                    <span>Processador:</span>
                  </div>
                  <span className="text-sm">Intel i7-10700K</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Memória:</span>
                  </div>
                  <span className="text-sm">16 GB RAM</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4" />
                    <span>Placa de Vídeo:</span>
                  </div>
                  <span className="text-sm">RTX 3070</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center space-x-3">
              <Tag className="h-6 w-6" />
              <span>Informações do Jogo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between items-center">
                <span>Desenvolvedor:</span>
                <span className="text-white font-medium">Epic Games</span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <span>Publicadora:</span>
                <span className="text-white font-medium">Epic Games</span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <span>Data de Lançamento:</span>
                <span className="text-white font-medium">15 de Março, 2024</span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <span>Tamanho do Download:</span>
                <span className="text-white font-medium">50 GB</span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <span>Idiomas:</span>
                <span className="text-white font-medium">Português, Inglês, Espanhol</span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <span>Classificação:</span>
                <span className="text-white font-medium">T (Teen)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GameDetails
